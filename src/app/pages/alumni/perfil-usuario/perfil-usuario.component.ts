import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css', '../../../../assets/prefabs/PerfilUser.css', '../../../../assets/prefabs/headers.css']
})
export class PerfilUsuarioComponent  implements OnInit{
  public urlImage: string = '';
  public rutaimagen: string = '';
  ngOnInit(): void {
    this.loadUserDataByUsername();
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
