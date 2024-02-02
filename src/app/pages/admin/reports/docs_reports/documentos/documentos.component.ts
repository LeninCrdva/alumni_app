import { Component, OnInit } from '@angular/core';
import { Graduado } from '../../../../../data/model/graduado';
import { GraduadoService } from '../../../../../data/service/graduado.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrl: './documentos.component.css'
})
export class DocumentosComponent implements OnInit{
  graduadoList: Graduado[] = []

  constructor(private graduadoService: GraduadoService) {}

  ngOnInit(): void {
    this.cargarLista()
  }

  cargarLista():void {
    this.graduadoService.getGraduadosWithOutOferta().subscribe(
      graduado => this.graduadoList = graduado
    )
  }

}
