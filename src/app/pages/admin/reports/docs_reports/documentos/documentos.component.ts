import { Component, OnInit } from '@angular/core';
import { Graduado, Graduado1 } from '../../../../../data/model/graduado';
import { GraduadoService } from '../../../../../data/service/graduado.service';
import { error } from 'jquery';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {
  graduados: Graduado1[] = [];
  constructor(private graduadoService: GraduadoService) { }
  ngOnInit(): void {
    this.cargarGraduados();
  }

  cargarGraduados(): void {
    this.graduadoService.getGraduadosWithoutDTO().subscribe(
      graduados => {
        this.graduados = graduados;
        console.log('Graduados cargados:', this.graduados);
      },
      error => {
        console.error('Error al cargar los graduados:', error);
      }
    );
  }

  cargarGraduadosSinPostular(): void {
    this.graduadoService.getGraduadoSinPostular().subscribe(
      graduadoSinPostular => {
        this.graduados = graduadoSinPostular;
        console.log('Graduados sin postular cargados:', this.graduados);
      },
      error => {
        console.error('Error al cargar los graduados sin postular:', error);
      }
    );
  }
  cargarGraduadoConPostulacion(): void {
    this.graduadoService.getGraduadoConPostulacion().subscribe(
      graduadoConPostulacion => {
        this.graduados = graduadoConPostulacion;
        console.log('Graduados con postulacion cragados: ', this.graduados)
      },
      error => {
        console.error('error al cargar los graduados con postulaciones:', error);
      }
    );
  }
  cargarGraduadoSinExperiencia(): void{
    this.graduadoService.getGraduadoSinExperiencia().subscribe(
      graduadoSinExperiencia => {
        this.graduados = graduadoSinExperiencia;
        console.log('Graduados sin experiencia Cargados:', this.graduados)
      }
    )
  }
  aplicarFiltros(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement)?.value;
    switch (selectedValue) {
      case 'todos':
        this.cargarGraduados();
        break;
      case 'sinPostular':
        this.cargarGraduadosSinPostular();
        break;
      case 'graduadoMasUnaPostulacion':
      this.cargarGraduadoConPostulacion();
        break;
        case 'sinExperienciaLaboral':
          this.cargarGraduadoSinExperiencia();
          break;
      default:
        console.log('Opción de filtro no reconocida:', selectedValue);
        break;
    }
  }
}
