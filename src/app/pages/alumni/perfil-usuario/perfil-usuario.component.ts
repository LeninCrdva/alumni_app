import { Component, OnInit } from '@angular/core';
import {GraduadoService } from '../../../data/service/graduado.service';
import {UserService} from '../../../data/service/UserService';
@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css', '../../../../assets/prefabs/PerfilUser.css', '../../../../assets/prefabs/headers.css']
})
export class PerfilUsuarioComponent  implements OnInit{
  public urlImage: string = '';
  public rutaimagen: string = '';
  public nombres: string ='';
  public usuarioGuardado: string = localStorage.getItem('name') || '';
  constructor(private graduadoService: GraduadoService) { }
  ngOnInit(): void {
    this.loadUserDataByUsername();
    this.buscarGraduadosPorUsuario();
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
  buscarGraduadosPorUsuario() {
   // Reemplaza esto con el nombre de usuario que buscas
    this.graduadoService.searchGraduadosByUsuario(this.usuarioGuardado).subscribe(
      graduadosEncontrados => {
        // Haz algo con los graduados encontrados, por ejemplo, mostrarlos en la interfaz
        console.log('Graduados encontrados:', graduadosEncontrados);
      },
      error => {
        console.error('Error al buscar graduados por usuario:', error);
      }
    );
  }
 
 
}
