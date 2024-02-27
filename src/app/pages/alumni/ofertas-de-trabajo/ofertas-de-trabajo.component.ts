import { Component, OnInit } from '@angular/core';
import { ofertaLaboralDTO } from '../../../data/model/ofertaLaboralDTO';
import { OfertalaboralService } from '../../../data/service/ofertalaboral.service';
import { GraduadoDTO } from '../../../data/model/DTO/GraduadoDTO';
import { GraduadoService } from '../../../data/service/graduado.service';
import Swal from 'sweetalert2';
import { ofertaLaboral } from '../../../data/model/ofertaLaboral';
import { MailService } from '../../../data/service/mail.service';
import { MailRequest } from '../../../data/model/Mail/MailRequest';

@Component({
  selector: 'app-ofertas-de-trabajo',
  templateUrl: './ofertas-de-trabajo.component.html',
  styleUrls: ['./ofertas-de-trabajo.component.css', '../../../../assets/prefabs/PerfilUser.css']
})
export class OfertasDeTrabajoComponent implements OnInit {
  mailRequest: MailRequest = new MailRequest();
  listOfertas: ofertaLaboralDTO[] = [];
  graduadoDTO: GraduadoDTO = new GraduadoDTO()
  value: string = 'seleccionar'

  constructor(private ofertasService: OfertalaboralService, private postulacionesService: GraduadoService, private mailService: MailService) { }

  ngOnInit(): void {
    this.cargarOfertas()
  }


  cargarOfertas(): void {
    this.ofertasService.getOfertasLaborales().subscribe(
      oferta => this.listOfertas = oferta
    )
  }

  createGraduadoDTO(oferta: ofertaLaboralDTO): GraduadoDTO {
    const nuevoGraduadoDTO: GraduadoDTO = new GraduadoDTO();
    nuevoGraduadoDTO.idOferta = [];

    if (oferta.id !== undefined) {
      nuevoGraduadoDTO.idOferta.push(oferta.id);
    } else {
      console.error("La oferta no tiene un ID definido.");
    }
    return nuevoGraduadoDTO;
  }

  requestOffer(Offer: GraduadoDTO) {
    let isPres: boolean = true;

    const idUser = localStorage.getItem('user_id');

    if (idUser) {
      this.postulacionesService.getGraduadoByUsuarioId(parseInt(idUser)).subscribe(
        grad => {
          this.graduadoDTO = grad;
          Offer.email_personal = this.graduadoDTO.email_personal;
          outerLoop: for (const id of this.graduadoDTO?.idOferta || []) {
            for (const newOffer of Offer.idOferta) {
              if (id === newOffer) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Ya has postulado a esta oferta',
                });
                isPres = false;
                break outerLoop;
              }
            }
          }

          if (isPres && this.graduadoDTO?.id !== undefined) {
            this.postulacionesService.updateOfferInGraduado(Offer, this.graduadoDTO.id).subscribe(
              grad => {
                this.graduadoDTO = grad;
              }
            );

            if (this.graduadoDTO) {
              Swal.fire({
                icon: 'success',
                title: 'Genial',
                text: 'Has realizado la postulación correctamente',
              });
              this.sendMail(Offer);
            }
          }
        }
      );
    }
  }

  sortBy(event: any): void {
    const value = event.target.value;
  
    if (value) {
      this.listOfertas.sort((a, b) => {
        const propA = a[value];
        const propB = b[value];
  
        if (typeof propA === 'number' && typeof propB === 'number') {
          return propB - propA;
        } else if (typeof propA === 'string' && typeof propB === 'string') {
          return propA.localeCompare(propB);
        } else {
          return 0;
        }
      });
    }
  }

  sendMail(graduado: GraduadoDTO): void {
    this.mailRequest = {
      name:  graduado.idOferta[0].toString(),
      to: graduado.email_personal,
      from: 'info.alumni.est@gmail.com',
      subject: '¡Haz realizado una postulación!',
      caseEmail: 'postulate'
    }

    this.mailService.sendCasePostulateEmail(this.mailRequest).subscribe()
  }
}
