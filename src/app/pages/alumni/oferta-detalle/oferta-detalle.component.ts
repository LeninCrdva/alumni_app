import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ofertaLaboral } from '../../../data/model/ofertaLaboral';
import { OfertalaboralService } from '../../../data/service/ofertalaboral.service';
import { GraduadoDTO } from '../../../data/model/DTO/GraduadoDTO';
import { GraduadoService } from '../../../data/service/graduado.service';
import Swal from 'sweetalert2';
import { PostulacionDTO } from '../../../data/model/DTO/postulacionDTO';
import { EstadoPostulacion } from '../../../data/model/enum/enums';
import { PostulacionService } from '../../../data/service/postulacion.service';

@Component({
  selector: 'app-oferta-detalle',
  templateUrl: './oferta-detalle.component.html',
  styleUrls: ['./oferta-detalle.component.css', '../../../../assets/prefabs/PerfilUser.css']
})
export class OfertaDetalleComponent implements OnInit {
  isPressed: boolean = false;
  authoritiesStorage: any;
  ofertaDetail: ofertaLaboral = new ofertaLaboral();
  graduadoDTO: GraduadoDTO = new GraduadoDTO();
  diferenceDate: Date = new Date();

  constructor(private ofertaService: OfertalaboralService, private postulacionesService: PostulacionService, private router: Router, private activeRoute: ActivatedRoute) { }

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

  requestOffer(idOferta: number) {
    this.isPressed = true;

    const idUser = localStorage.getItem('user_id');

    const postulacionCreate: PostulacionDTO = {
      ofertaLaboral: idOferta,
      graduado: idUser ? parseInt(idUser) : 0,
      estado: EstadoPostulacion.APLICANDO.toString()
    };

    this.postulacionesService.createPostulacion(postulacionCreate).subscribe(
      post => {
        if (post) {
          Swal.fire({
            icon: 'success',
            title: 'Genial',
            text: 'Has realizado la postulación correctamente',
          });

          this.router.navigate(['system/alumni/postulaciones']);
        }
      }
    );
  }
}
