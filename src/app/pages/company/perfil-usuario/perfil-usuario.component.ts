import { Component, NgModule } from '@angular/core';
import { Usuario } from '../../../data/model/usuario';
import { Empresario } from '../../../data/model/empresario';
import { EmpresarioService } from '../../../data/service/empresario.service';
import { UserService } from '../../../data/service/UserService';
import { Rol } from '../../../data/model/rol';
import { Persona } from '../../../data/model/persona';
import { EmpresaService } from '../../../data/service/empresa.service';


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css', '../../../../assets/prefabs/PerfilUser.css', '../../../../assets/prefabs/headers.css']
})
export class PerfilUsuarioComponent {
  name: string | null = localStorage.getItem('name');
  usuarios: any = {};
  empresass: any = {};
  nuevoEmpresario: Empresario = {
    id: 0,
    usuario: this.usuarios.nombre_usuario,
    estado: false,
    puesto: '',
    anios: 0,
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
  constructor(private empresarioService: EmpresarioService, private usuarioService: UserService, private empresaService:EmpresaService) { }
  
  ngOnInit(): void {
    this.usuarios = {
      clave: '',
      nombreUsuario: '',
      estado: false,
      url_imagen: '',
      persona: new Persona,
      ruta_imagen: '',
      rol: new Rol
    }
    this.empresass = {
      id: 0,
      empresario: this.nuevoEmpresario,
      ciudad: '',
      sectorempresarial: '',
      ruc: '',
      nombre: '',
      tipoEmpresa: '',
      razonsocial: '',
      area: '',
      ubicacion: '',
      sitioweb: ''
    }
  this.obtenerUsuario();    
  }

  crearEmpresario() {
    this.calcularEdad();
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
        console.log('Usuario obtenido exitosamente:', this.usuarios.nombreUsuario);
        this.nuevoEmpresario.usuario = this.usuarios.nombreUsuario;
        this.nuevoEmpresario.estado = this.usuarios.estado
        localStorage.setItem('idUser', this.usuarios.id);
        console.log('Usuario obtenido exitosamente:', localStorage.getItem('idUser'));
      },
      error => console.error('Error al obtener usuario:', error)
    );
  }

  getEmpresas() {
    this.empresaService.getEmpresas().subscribe(
      empresas => {
        this.empresass = empresas;
        console.log('Empresas obtenidas exitosamente:', empresas);
      },
      error => console.error('Error al obtener empresas:', error)
    );
  }

  calcularEdad(): number {
    // Fecha de nacimiento ("YYYY-MM-DD")
const fechaNacimientoString =this.usuarios.persona.fechaNacimiento;
const fechaNacimiento = new Date(fechaNacimientoString);

// Fecha actual
const fechaActual = new Date();

// Calcula la diferencia de tiempo en milisegundos
const diferenciaEnMilisegundos = fechaActual.getTime() - fechaNacimiento.getTime();

// Convierte la diferencia de milisegundos a años
const edadEnAnios = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24 * 365.25);

// Redondea la edad a un número entero
const edadRedondeada = Math.floor(edadEnAnios);
this.nuevoEmpresario.anios = edadRedondeada;

      return edadRedondeada;
  }
  

}
