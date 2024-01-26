import { Component } from '@angular/core';
import { Usuario } from '../../../data/model/usuario';
import { Empresario } from '../../../data/model/empresario';
import { EmpresarioService } from '../../../data/service/empresario.service';
import { UserService } from '../../../data/service/UserService';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css', '../../../../assets/temporal/style.css', '../../../../assets/prefabs/headers.css']
})
export class PerfilUsuarioComponent {
  name: string | null = localStorage.getItem('name');
  usuarios: Usuario|any = [];
  nuevoEmpresario: Empresario = {
    estado: false,
    puesto: '',
    anios: 0,
    usuario: this.usuarios,
  };
  nuevoEmpresarioCarga: Empresario = {
    id: 0,
    estado: false,
    puesto: '',
    anios: 0,
    usuario: this.usuarios,
  };
  constructor(private empresarioService: EmpresarioService, private usuarioService: UserService) { }
  ngOnInit(): void {
  this.obtenerUsuario();
  }

  crearEmpresario() {
    this.nuevoEmpresario.usuario = this.usuarios;
    this.empresarioService.createEmpresario(this.nuevoEmpresario).subscribe(
      empresario => {
        console.log('Empresario creado exitosamente:', empresario);
      },
      error => console.error('Error al crear empresario:', error)
    );
  }

  obtenerUsuario(){
    this.usuarioService.getUsuarioByUsername(this.name ?? '').subscribe(
      usuario => {
        this.usuarios = usuario;
        console.log('Usuario obtenido exitosamente:', this.usuarios);
        this.nuevoEmpresario.usuario = this.usuarios;
        console.log('Usuario obtenido exitosamente:', this.nuevoEmpresario.usuario);
      },
      error => console.error('Error al obtener usuario:', error)
    );
  }

}
