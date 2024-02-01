import { Component, OnInit } from '@angular/core';
import { ofertaLaboralDTO } from '../../../data/model/ofertaLaboralDTO';
import { OfertalaboralService } from '../../../data/service/ofertalaboral.service';

@Component({
  selector: 'app-ofertas-de-trabajo',
  templateUrl: './ofertas-de-trabajo.component.html',
  styleUrls: ['./ofertas-de-trabajo.component.css', '../../../../assets/prefabs/PerfilUser.css']
})
export class OfertasDeTrabajoComponent implements OnInit {
  listOfertas: ofertaLaboralDTO[] = [];

  constructor(private ofertasService: OfertalaboralService){}

  ngOnInit(): void {
    this.cargarOfertas()
  }


  cargarOfertas(): void {
    this.ofertasService.getOfertasLaborales().subscribe(
      oferta => this.listOfertas = oferta
    )
  }

}
