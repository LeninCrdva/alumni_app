import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ofertaLaboral } from '../../../data/model/ofertaLaboral';
import { OfertalaboralService } from '../../../data/service/ofertalaboral.service';
import { GraduadoDTO } from '../../../data/model/DTO/GraduadoDTO';
import { GraduadoService } from '../../../data/service/graduado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-oferta-detalle',
  templateUrl: './oferta-detalle.component.html',
  styleUrls: ['./oferta-detalle.component.css', '../../../../assets/prefabs/PerfilUser.css']
})
export class OfertaDetalleComponent implements OnInit {
  authoritiesStorage: any;
  ofertaDetail: ofertaLaboral = new ofertaLaboral();
  graduadoDTO: GraduadoDTO = new GraduadoDTO();
  diferenceDate: Date = new Date();

  constructor(private ofertaService: OfertalaboralService, private postulacionesService: GraduadoService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.detallarOferta();
  }

  async detallarOferta(): Promise<void> {
    this.activeRoute.params.subscribe(async params => {
      let id = params['id'];
      if (id) {
        this.ofertaDetail = (await this.ofertaService.getOfertaLaboralById(id).toPromise()) ?? new ofertaLaboral();
      }
    });
  }

  obtenerTiempoTranscurrido(): string {
    const hoy: Date = new Date();
    const fechaPublicacion: Date = new Date(this.ofertaDetail.fechaPublicacion + 'T00:00:00');

    const diferenciaMilisegundos: number = hoy.getTime() - fechaPublicacion.getTime();
    const diferenciaDias: number = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

    if (diferenciaDias === 1) {
      return 'Publicado hace 1 día';
    } else if (diferenciaDias < 7) {
      return `Publicado hace ${diferenciaDias} días`;
    } else {
      const diferenciaSemanas: number = Math.floor(diferenciaDias / 7);
      return `Publicado hace ${diferenciaSemanas} semanas`;
    }
  }

  createGraduadoDTO(): GraduadoDTO {
    const nuevoGraduadoDTO: GraduadoDTO = new GraduadoDTO();
    nuevoGraduadoDTO.idOferta = [];

    if (this.ofertaDetail.id !== undefined) {
      nuevoGraduadoDTO.idOferta.push(this.ofertaDetail.id);
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
            }
          }
        }
      );
    }
  }
}
