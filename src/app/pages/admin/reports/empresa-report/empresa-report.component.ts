import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../../../data/service/empresa.service';
import { Empresa } from '../../../../data/model/empresa';
@Component({
  selector: 'app-empresa-report',
  templateUrl: './empresa-report.component.html',
  styleUrl: './empresa-report.component.css'
})
export class EmpresaReportComponent implements OnInit{
  empresa: Empresa[] = [];
  constructor(private empresaService: EmpresaService) { }
  ngOnInit(): void {
    this.cargarEmpresas();
  }

  cargarEmpresas(): void {
    this.empresaService.getEmpresas().subscribe(
      empresas => {
        this.empresa = empresas;
        console.log('Empresas cargadas:', this.empresa);
      },
      error => {
        console.error('Error al cargar los graduados:', error);
      }
    );
  }
  cargarEmpresaSinPublicar(): void {
    this.empresaService.getEmpresaSinOfertasLab().subscribe(
      empresas => {
        this.empresa = empresas;
        console.log('Empresas cargadas:', this.empresa);
      },
      error => {
        console.error('Error al cargar los graduados:', error);
      }
    );
  }
  aplicarFiltros(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement)?.value;
    switch (selectedValue) {
      case 'todos':
        this.cargarEmpresas();
        break;
        case 'sinPublicar':
        this.cargarEmpresaSinPublicar();
        break;
      default:
        console.log('Opción de filtro no reconocida:', selectedValue);
        break;
    }
  }
}
