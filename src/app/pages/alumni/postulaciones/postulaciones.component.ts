import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraduadoService } from '../../../data/service/graduado.service';
import { ofertaLaboral } from '../../../data/model/ofertaLaboral';
import { GraduadoDTO } from '../../../data/model/DTO/GraduadoDTO';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { MailService } from '../../../data/service/mail.service';
import { MailRequest } from '../../../data/model/Mail/MailRequest';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css', '../../../../assets/prefabs/headers.css']
})
export class PostulacionesComponent implements OnInit {
  mailRequest: MailRequest = new MailRequest();
  postulaciones: ofertaLaboral[] = [];
  graduadoDTO: GraduadoDTO = new GraduadoDTO();
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @Output() onClose: EventEmitter<string> = new EventEmitter();
  searchTerm: string = '';

  constructor(private postulacionesService: GraduadoService, private mailService: MailService) { }

  ngOnInit(): void {
    this.setupDtOptions();
    this.detallarOferta();
  }

  setupDtOptions() {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      lengthChange: true,
      language: {
        search: 'Buscar:',
        searchPlaceholder: 'Buscar experiencia...',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
        infoEmpty: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
        paginate: {
          first: 'Primera',
          last: 'Última',
          next: 'Siguiente',
          previous: 'Anterior',
        },
        lengthMenu: 'Mostrar _MENU_ registros por página',
        zeroRecords: 'No se encontraron registros coincidentes'
      },
      lengthMenu: [10, 25, 50]
    };
  }
  
  async detallarOferta(): Promise<void> {

    const authoritieStorage = localStorage.getItem('authorities')

    if (authoritieStorage) {
      const parsedData = JSON.parse(authoritieStorage);

      if (Array.isArray(parsedData) && parsedData.includes('ROL_GRADUADO')) {
        const userIdStorage = localStorage.getItem('name')
        if (userIdStorage) {
          this.postulaciones = (await this.postulacionesService.getOfertasLaboralesByUsername(userIdStorage).toPromise()) || [];
        }
      }
    }
  }

  createGraduadoDTO(oferta: ofertaLaboral): GraduadoDTO {
    const nuevoGraduadoDTO: GraduadoDTO = new GraduadoDTO();
    nuevoGraduadoDTO.idOferta = [];

    if (oferta.id !== undefined) {
      nuevoGraduadoDTO.idOferta.push(oferta.id);
    } else {
      console.error("La oferta no tiene un ID definido.");
    }
    return nuevoGraduadoDTO;
  }

  cancelOffer(Offer: GraduadoDTO) {

    const idUser = localStorage.getItem('user_id');

    if (idUser) {
      this.postulacionesService.getGraduadoByUsuarioId(parseInt(idUser)).subscribe(
        grad => {
          this.graduadoDTO = grad;

          console.log('Valor de ID graduado', this.graduadoDTO);

          Swal.fire({
            title: "¿Realmente quiere cancelar esta postulación?",
            text: "Esta acción es irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, cancelar postulación!"
          }).then((result) => {
            if (result.isConfirmed && this.graduadoDTO?.id !== undefined) {
              this.postulacionesService.cancelOfferInGraduado(Offer, this.graduadoDTO.id).subscribe(
                grad => {
                  Offer.email_personal = this.graduadoDTO.email_personal;
                  this.graduadoDTO = grad;
                  this.detallarOferta();
                  Swal.fire({
                    title: "¡Eliminado!",
                    text: "Se ha cancelado la postulación",
                    icon: "success"
                  });
                  this.sendMail(Offer);
                },
              );
            }
          });
        }
      );
    }
  }

  filterOfertasLaborales(): ofertaLaboral[] {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase().trim();

    return this.postulaciones.filter(oferta => 
      Object.values(oferta).some(value =>
        value !== null && typeof value === 'string' && value.toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
  }

  sendMail(graduado: GraduadoDTO): void {
    this.mailRequest = {
      name:  graduado.idOferta[0].toString(),
      to: graduado.email_personal,
      from: 'info.alumni.est@gmail.com',
      subject: '¡Se ha cancelado una postulación!',
      caseEmail: 'remove-postulate'
    }

    this.mailService.sendCasePostulateEmail(this.mailRequest).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Correo enviado!',
        text: 'Se ha enviado un correo con la notificación de cancelación de postulación'
      });
    })
  }
}
