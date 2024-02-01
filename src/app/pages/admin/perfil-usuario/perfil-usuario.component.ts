import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css', '../../../../assets/prefabs/PerfilUser.css']
})
export class PerfilUsuarioComponent implements OnInit {

  public id: number = 0;
  public clave: string = '';
  public nombreUsuario: string = '';
  public estado: boolean = false;
  
  public rolId: number = 0;
  public rolNombre: string = '';
  public rolDescripcion: string = '';
  
  public rutaImagen: string = '';
  public urlImagen: string = '';
  
  public personaId: number = 0;
  public cedula: string = '';
  public primerNombre: string = '';
  public segundoNombre: string = '';
  public fechaNacimiento: string = '';
  public telefono: string = '';
  public apellidoPaterno: string = '';
  public apellidoMaterno: string = '';

  ngOnInit() {
    this.cargardatos();
  }

  cargardatos() {
    const userDataString = localStorage.getItem('user_data');
    if (userDataString) {
      const userData = JSON.parse(userDataString);

      // Asignar valores a variables públicas
      this.id = userData.id;
      this.clave = userData.clave;
      this.nombreUsuario = userData.nombreUsuario;
      this.estado = userData.estado;

      this.rolId = userData.rol.id;
      this.rolNombre = userData.rol.nombre;
      this.rolDescripcion = userData.rol.descripcion;

      this.rutaImagen = userData.ruta_imagen;
      this.urlImagen = userData.url_imagen;

      this.personaId = userData.persona.id;
      this.cedula = userData.persona.cedula;
      this.primerNombre = userData.persona.primer_nombre;
      this.segundoNombre = userData.persona.segundo_nombre;
      this.fechaNacimiento = userData.persona.fechaNacimiento;
      this.telefono = userData.persona.telefono;
      this.apellidoPaterno = userData.persona.apellido_paterno;
      this.apellidoMaterno = userData.persona.apellido_materno;
    }
  }
}