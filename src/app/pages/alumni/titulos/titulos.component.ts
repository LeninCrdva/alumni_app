import { Component, OnInit } from '@angular/core';
import { TituloService } from '../../../data/service/titulo.service';

@Component({
  selector: 'app-titulos',
  templateUrl: './titulos.component.html',
  styleUrls: ['./titulos.component.css', '../../../../assets/prefabs/headers.css']
})
export class TitulosComponent implements OnInit {

  editarClicked = false;

  onEditarClick(): void {
    this.editarClicked = true;
  }

  onRegistrarClick(): void {
    this.editarClicked = false;
  }
  titulos: any[] = [];

  constructor(private tituloService: TituloService) { }

  ngOnInit(): void {
    // this.loadTitulos();
  }

}