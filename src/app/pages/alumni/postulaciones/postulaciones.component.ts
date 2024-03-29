import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraduadoService } from '../../../data/service/graduado.service';
import { ofertaLaboral } from '../../../data/model/ofertaLaboral';
import { GraduadoDTO } from '../../../data/model/DTO/GraduadoDTO';
import { Subject } from 'rxjs';
import { MailService } from '../../../data/service/mail.service';
import { MailRequest } from '../../../data/model/Mail/MailRequest';
import { PostulacionService } from '../../../data/service/postulacion.service';
import { Postulacion } from '../../../data/model/postulacion';
import { EstadoPostulacion } from '../../../data/model/enum/enums';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css']
})
export class PostulacionesComponent implements OnInit {
  estadoPostulacion = EstadoPostulacion;
  mailRequest: MailRequest = new MailRequest();
  postulaciones: ofertaLaboral[] = [];
  misPostulaciones: Postulacion[] = [];
  graduadoDTO: GraduadoDTO = new GraduadoDTO();
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  loading: boolean = false;

  @Output() onClose: EventEmitter<string> = new EventEmitter();
  searchTerm: string = '';

  constructor(private mailService: MailService, private mypPostulacionService: PostulacionService
    ) { }

  ngOnInit(): void {
    this.setupDtOptions();
    this.detallarOferta();
    
  }
  modalImage: string | undefined ;
  openModal(imageUrl: string | undefined) {
    this.loading = true;
    
    Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    
    setTimeout(() => {
        this.loading = false; 
        this.modalImage = imageUrl;
        ($('#m_modal_4') as any).modal('show'); 
        Swal.close(); 
    }, 2000);
}


closeModal() {
  this.modalImage = '';

  if ($('#m_modal_4').hasClass('show')) {
    ($('#m_modal_4') as any).modal('hide');
  }
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
    const userIdStorage = localStorage.getItem('user_id')

    this.misPostulaciones = (await this.mypPostulacionService.getAllPostulacionesByGraduadoId(userIdStorage ? parseInt(userIdStorage) : 0).toPromise()) || [];
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

  cancelOffer(postulacion: Postulacion) {

    const idUser = localStorage.getItem('user_id');

    const miPostulacion = {
      ofertaLaboral: postulacion.ofertaLaboral?.id,
      graduado: parseInt(idUser ? idUser : '0'),
      estado: EstadoPostulacion.CANCELADA_POR_GRADUADO.toString()
    }

    this.mypPostulacionService.updateStatePostulacion(postulacion.id ? postulacion.id : 0, miPostulacion).subscribe(() => {
      Swal.fire({
        title: "¡Eliminado!",
        text: "Se ha cancelado la postulación",
        icon: "success"
      });
      this.detallarOferta();
    });
  }

  repostulateOffer(postulacion: Postulacion) {

    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Desea postularse a la oferta laboral nuevamente?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const idUser = localStorage.getItem('user_id');

        const miPostulacion = {
          ofertaLaboral: postulacion.ofertaLaboral?.id,
          graduado: parseInt(idUser ? idUser : '0'),
          estado: EstadoPostulacion.APLICANDO.toString()
        }

        this.mypPostulacionService.updateStatePostulacion(postulacion.id ? postulacion.id : 0, miPostulacion).subscribe(() => {
          Swal.fire({
            title: "¡Postulado!",
            text: "Se ha postulado a la oferta nuevamente",
            icon: "success"
          });
          this.detallarOferta();
        });
      }
    });
  }

  filterOfertasLaborales(): Postulacion[] { //Adapt this method for the new model "Postulacion"
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase().trim();

    return this.misPostulaciones.filter(oferta =>
      Object.values(oferta).some(value =>
        value !== null && typeof value === 'string' && value.toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
  }
}
