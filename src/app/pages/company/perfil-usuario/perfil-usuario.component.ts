import { Component, NgModule } from '@angular/core';
import { Usuario } from '../../../data/model/usuario';
import { Empresario } from '../../../data/model/empresario';
import { EmpresarioService } from '../../../data/service/empresario.service';
import { UserService } from '../../../data/service/UserService';
import { Rol } from '../../../data/model/rol';
import { Persona } from '../../../data/model/persona';


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css', '../../../../assets/temporal/style.css', '../../../../assets/prefabs/headers.css']
})
export class PerfilUsuarioComponent {
  name: string | null = localStorage.getItem('name');
  usuarios: any = {};
  estado: String = '';
  nuevoEmpresario: Empresario = {
    estado: false,
    puesto: '',
    anios: 0,
    usuario: this.usuarios,
    email: '',
  };
  nuevoEmpresarioCarga: Empresario = {
    id: 0,
    estado: false,
    puesto: '',
    anios: 0,
    usuario: this.usuarios,
    email: '',
  };
  constructor(private empresarioService: EmpresarioService, private usuarioService: UserService) { }
  
  ngOnInit(): void {
    this.usuarios = {
      clave: '',
      nombre_usuario: '',
      estado: false,
      url_imagen: '',
      persona: new Persona,
      ruta_imagen: '',
      rol: new Rol
    }
  this.obtenerUsuario();
  this.nuevoEmpresario.usuario = this.usuarios;
    console.log('Usuario:', this.usuarios)
    
    
  }

  crearEmpresario() {
    this.nuevoEmpresario.usuario = this.usuarios;
    console.log('Usuario obtenido:', this.name)
    console.log('Usuario obtenido exitosamente:', this.nuevoEmpresario.usuario)
    this.empresarioService.createEmpresario(this.nuevoEmpresario).subscribe(
      empresario => {
        console.log('Empresario creado exitosamente:', empresario);
      },
      error => console.error('Error al crear empresario:', error)
    );
  }

  obtenerUsuario(){
    const username = this.name || ''; // Provide a default value for the parameter
    this.usuarioService.getUsuarioByUsername(username).subscribe(
      usuario => {
        this.usuarios = usuario;
        console.log('Usuario obtenido exitosamente:', this.usuarios);
        this.nuevoEmpresario.usuario = this.usuarios;
        console.log('Usuario obtenido exitosamente:', this.nuevoEmpresario.usuario);
      },
      error => console.error('Error al obtener usuario:', error)
    );
  }

  calcularEdad(): number {
    // Fecha de nacimiento ("YYYY-MM-DD")
const fechaNacimientoString = "2000-01-01";
const fechaNacimiento = new Date(fechaNacimientoString);

// Fecha actual
const fechaActual = new Date();

// Calcula la diferencia de tiempo en milisegundos
const diferenciaEnMilisegundos = fechaActual.getTime() - fechaNacimiento.getTime();

// Convierte la diferencia de milisegundos a años
const edadEnAnios = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24 * 365.25);

// Redondea la edad a un número entero
const edadRedondeada = Math.floor(edadEnAnios);

      return edadRedondeada;
  }
  

}
