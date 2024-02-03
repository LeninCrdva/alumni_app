import { Component, OnInit } from '@angular/core';
import { Graduado } from '../../../../data/model/graduado';
import { GraduadoService } from '../../../../data/service/graduado.service';
@Component({
  selector: 'app-empresa-report',
  templateUrl: './empresa-report.component.html',
  styleUrl: './empresa-report.component.css'
})
export class EmpresaReportComponent implements OnInit{

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
