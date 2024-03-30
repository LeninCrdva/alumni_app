import { Component } from '@angular/core';
import { GraduadoService } from '../../../data/service/graduado.service';
import { Graduado } from '../../../data/model/graduado';
import { Usuario } from '../../../data/model/usuario';
import { Ciudad } from '../../../data/model/ciudad';
import { error } from 'jquery';

@Component({
  selector: 'app-perfil-graduado',
  templateUrl: './perfil-graduado.component.html',
  styleUrls: ['./perfil-graduado.component.css', '../../../../assets/prefabs/PerfilUser.css']


})
export class PerfilGraduadoComponent {

  public urlImage: string = '';
  public rutaimagen: string = '';
  public graduadoid: number = 0;
  public idstring: string = '';
  graduado: Graduado = {id:0, usuario: new Usuario(), ciudad: new Ciudad(), anioGraduacion: new Date(), emailPersonal: '', estadoCivil: '', rutaPdf: '', urlPdf: ''};
  ngOnInit(): void {
    this.loadUserDataByUsername();
    this.idstring = localStorage.getItem('idGraduado') || '';
    this.graduadoid = parseInt(this.idstring,10)
    if(this.graduadoid > 0){
      this.getGraduadoById();
    }
  }

  constructor(private graduadoService : GraduadoService){}

  getGraduadoById(){
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
