import { Component, OnInit } from '@angular/core';
import { TituloService } from '../../../data/service/titulo.service';
import { Titulo } from '../../../data/model/titulo';
import { Graduado } from '../../../data/model/graduado';
import { Carrera } from '../../../data/model/carrera';
import { Usuario } from '../../../data/model/usuario';
import { UserService } from '../../../data/service/UserService';

@Component({
  selector: 'app-titulos',
  templateUrl: './titulos.component.html',
  styleUrls: ['./titulos.component.css', '../../../../assets/prefabs/headers.css']
})
export class TitulosComponent implements OnInit {
  // Note: Obtener usuario
  name: string | null = localStorage.getItem('name');
  usuarios: Usuario | any = [];

  graduado: Graduado | any = [];
  carrera: Carrera | any = [];

  titulos: Titulo[] = [];
  nuevoTitulo: Titulo = { graduado: this.graduado, tipo: '', nivel: '', institucion: false, nombre_titulo: '', fecha_registro: new Date(), fecha_emision: new Date(), num_registro: '', carrera: this.carrera };
  nuevoTituloCarga: Titulo = { id: 0, graduado: this.graduado, tipo: '', nivel: '', institucion: false, nombre_titulo: '', fecha_registro: new Date(), fecha_emision: new Date(), num_registro: '', carrera: this.carrera };
  nuevoTituloEdit: Titulo = { id: 0, graduado: this.graduado, tipo: '', nivel: '', institucion: false, nombre_titulo: '', fecha_registro: new Date(), fecha_emision: new Date(), num_registro: '', carrera: this.carrera };

  editarClicked = false;

  constructor(private tituloService: TituloService, private usuarioService: UserService) { }

  ngOnInit(): void {
    this.loadTitulos();
    this.obtenerUsuario();
  }

  loadTitulos() {
    this.tituloService.getTitulos().subscribe(
      titulos => this.titulos = titulos,
      error => console.error(error)
    );
  }

  createTitulo() {
    this.editarClicked = false;
    this.tituloService.createTitulo(this.nuevoTitulo).subscribe(
      titulo => {
        console.log('Titulo creado exitosamente:', titulo);
        this.loadTitulos();
      },
      error => console.error('Error al crear el titulo:', error)
    );
  }

  onEditarClick(titulo: Titulo): void {
    this.editarClicked = true;
    this.nuevoTituloCarga = { ...titulo };
  }

  onRegistrarClick(): void {
    this.editarClicked = false;
  }

  onUpdateClick() {
    const id = this.nuevoTituloCarga.id;
    if (id !== undefined) {
      this.tituloService.updateTitulo(id, this.nuevoTituloCarga).subscribe(
        tituloActualizado => {
          console.log('Sector actualizado exitosamente:', tituloActualizado);

          this.loadTitulos();
        },
        error => console.error('Error al actualizar el titulo:', error)
      );
    } else {
      console.error('Error: El ID del titulo es undefined.');
    }
  }

  onDeleteClick(id: number) {

  }

  obtenerUsuario() {
    this.usuarioService.getUsuarioByUsername(this.name ?? '').subscribe(
      usuario => {
        this.usuarios = usuario;
        console.log('Usuario obtenido exitosamente:', this.usuarios);
        this.nuevoTitulo.graduado = this.usuarios;
        console.log('Usuario obtenido exitosamente:', this.nuevoTitulo.graduado);
      },
      error => console.error('Error al obtener usuario:', error)
    );
  }
}