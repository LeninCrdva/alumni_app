import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ofertaLaboral } from '../../../data/model/ofertaLaboral';
import { OfertalaboralService } from '../../../data/service/ofertalaboral.service';

@Component({
  selector: 'app-oferta-detalle',
  templateUrl: './oferta-detalle.component.html',
  styleUrls: ['./oferta-detalle.component.css', '../../../../assets/prefabs/PerfilUser.css']
})
export class OfertaDetalleComponent implements OnInit {
  authoritiesStorage: any;
  ofertaDetail: ofertaLaboral = new ofertaLaboral();
  diferenceDate: Date = new Date();

  constructor(private ofertaService: OfertalaboralService, private router: Router, private activeRoute: ActivatedRoute) { }

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

  postular(idOffert:number):void {
    
  }
}
