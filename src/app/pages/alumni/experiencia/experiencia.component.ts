import { Component } from '@angular/core';
import { Experiencia } from '../../../data/model/experiencia';
import { Empresa } from '../../../data/model/empresa';
import { Graduado } from '../../../data/model/graduado';
import { Usuario } from '../../../data/model/usuario';
import { ExperienciaService } from '../../../data/service/experiencia.service';
import { UserService } from '../../../data/service/UserService';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css', '../../../../assets/prefabs/headers.css']
})
export class ExperienciaComponent {
  name: string | null = localStorage.getItem('name');
  usuarios: Usuario | any = [];

  graduado: Graduado | any = [];
  empresa: Empresa | any = [];

  experiencia: Experiencia[] = [];
  nuevoExperiencia: Experiencia = { graduado: this.graduado, cargo: '', duracion: '', institucion: '', actividad: '' };
  nuevoExperienciaCarga: Experiencia = { id: 0, graduado: this.graduado, cargo: '', duracion: '', institucion: '', actividad: ''};
  nuevoExperienciaEdit: Experiencia = { id: 0, graduado: this.graduado, cargo: '', duracion: '', institucion: '', actividad: '' };
  editarClicked = false;

  constructor(private experienciaService: ExperienciaService, private usuarioService: UserService) { }

  ngOnInit(): void {
    this.obtenerUsuario();
    this.loadExperiencias();
  }

  loadExperiencias() {
    this.experienciaService.getExperiencias().subscribe(
      experiencia => this.experiencia = experiencia,
      error => console.error(error)
    );
  }

  createExperiencia() {
    this.editarClicked = false;
    this.experienciaService.createExperiencia(this.nuevoExperiencia).subscribe(
      experiencia => {
        console.log('Experiencia creada exitosamente:', experiencia);
        this.loadExperiencias();
      },
      error => console.error('Error al crear la experiencia:', error)
    );
  }

  onEditarClick(experiencia: Experiencia): void {
    this.editarClicked = true;
    this.nuevoExperiencia = { ...experiencia };
  }

  onRegistrarClick(): void {
    this.editarClicked = false;
  }

  onUpdateClick() {
    const id = this.nuevoExperienciaCarga.id;
    if (id !== undefined) {
      this.experienciaService.updateExperiencia(id, this.nuevoExperienciaCarga).subscribe(
        refeActualizado => {
          console.log('Experiencia actualizada exitosamente:', refeActualizado);

          this.loadExperiencias();
        },
        error => console.error('Error al actualizar la experiencia:', error)
      );
    } else {
      console.error('Error: El ID de la experiencia es undefined.');
    }
  }

  onDeleteClick(id: number) {

  }

  obtenerUsuario() {
    this.usuarioService.getUsuarioByUsername(this.name ?? '').subscribe(
      usuario => {
        this.usuarios = usuario;
        console.log('Usuario obtenido exitosamente:', this.usuarios);
        this.nuevoExperiencia.graduado = this.usuarios;
        console.log('Usuario obtenido exitosamente:', this.nuevoExperiencia.graduado);
      },
      error => console.error('Error al obtener usuario:', error)
    );
  }
}