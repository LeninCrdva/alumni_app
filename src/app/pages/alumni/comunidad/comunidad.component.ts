import { Component, EventEmitter, Output } from '@angular/core';
import { Graduado } from '../../../data/model/graduado';
import { Subject } from 'rxjs';
import { GraduadoService } from '../../../data/service/graduado.service';
import { Usuario } from '../../../data/model/usuario';
import { Ciudad } from '../../../data/model/ciudad';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['comunidad.component.css', '../../../../assets/prefabs/headers.css']
})
export class ComunidadComponent {

  public urlImage: string = '';
  public rutaimagen: string = '';
  public graduadoid: number = 0;
  public idstring: string = '';
  graduado: Graduado = { id: 0, usuario: new Usuario(), ciudad: new Ciudad(), fecha_graduacion: new Date(), emailPersonal: '', estadocivil: '', ruta_pdf: '', url_pdf: '' };

  constructor(private graduadoService: GraduadoService) { }

  ngOnInit(): void {
    this.loadUserDataByUsername();
    this.idstring = localStorage.getItem('idGraduado') || '';
    this.graduadoid = parseInt(this.idstring, 10)
    if (this.graduadoid > 0) {
      this.getGraduadoById();
    }
  }

  getGraduadoById() {
    this.graduadoService.getGraduadoById(this.graduadoid).subscribe(
      data => {
        this.graduado = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  loadUserDataByUsername() {
    const storedRutaImagen = localStorage.getItem('ruta_imagen');
    const storedUrlImagen = localStorage.getItem('url_imagen');
    if (storedRutaImagen && storedUrlImagen) {
      this.rutaimagen = storedRutaImagen;
      this.urlImage = storedUrlImagen;
    } else {
      // Manejar el caso en el que la información no esté disponible en localStorage
      console.error('La información de imagen no está disponible en localStorage.');
    }
  }
}
