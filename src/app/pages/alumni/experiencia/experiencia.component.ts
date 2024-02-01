import { Component, EventEmitter, Output } from '@angular/core';
import { Experiencia } from '../../../data/model/experiencia';
import { Empresa } from '../../../data/model/empresa';
import { Graduado } from '../../../data/model/graduado';
import { Usuario } from '../../../data/model/usuario';
import { ExperienciaService } from '../../../data/service/experiencia.service';
import { UserService } from '../../../data/service/UserService';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css', '../../../../assets/prefabs/headers.css']
})
export class ExperienciaComponent {
  public cedula: string = '';

  experiencia: Experiencia[] = [];
  nuevoExperiencia: Experiencia = { cedulaGraduado: '', cargo: '', duracion: '', institucionNombre: '', actividad: '', area_trabajo: '' };
  nuevoExperienciaCarga: Experiencia = { id: 0, cedulaGraduado: '', cargo: '', duracion: '', institucionNombre: '', actividad: '', area_trabajo: '' }
  nuevoExperienciaEdit: Experiencia = { id: 0, cedulaGraduado: '', cargo: '', duracion: '', institucionNombre: '', actividad: '', area_trabajo: '' }
  editarClicked = false;

  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  mensajeMostrado = false;

  @Output() onClose: EventEmitter<string> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef, private experienciaService: ExperienciaService, private usuarioService: UserService) { }

  ngOnInit(): void {

    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      lengthChange: true,
      language: {
        search: 'Buscar:',
        searchPlaceholder: 'Buscar experiencia...',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
        paginate: {
          first: 'Primera',
          last: 'Última',
          next: 'Siguiente',
          previous: 'Anterior',
        },
        lengthMenu: 'Mostrar _MENU_ registros por página',
        zeroRecords: 'No se encontraron registros coincidentes'
      },
      lengthMenu: [10, 25, 50]
    };

    this.obtenerCedula();
    this.loadExperiencias();
  }

  loadExperiencias() {
    this.experienciaService.getExperiencias().subscribe(
      experiencia => {
        this.experiencia = experiencia;
      },
      (error: any) => console.error(error),
      () => this.dtTrigger.next(null)
    );
  }

  validateExperienciaFields(): boolean {
    if (!this.nuevoExperienciaCarga.cargo || !this.nuevoExperienciaCarga.duracion || !this.nuevoExperienciaCarga.institucionNombre || !this.nuevoExperienciaCarga.actividad) {
      return false;
    }

    return true;
  }

  mostrarSweetAlert(esExitoso: boolean, mensaje: string) {
    const titulo = esExitoso ? 'Completado exitosamente' : 'Se ha producido un error';

    Swal.fire({
      icon: esExitoso ? 'success' : 'error',
      title: titulo,
      text: mensaje,
      allowOutsideClick: !esExitoso,
    }).then((result) => {
      if (esExitoso || result.isConfirmed) {
        this.onClose.emit(esExitoso ? 'guardadoExitoso' : 'errorGuardado');
        this.bsModalRef.hide();
      }
    });
  }

  onEditarClick(experiencia: Experiencia): void {
    this.editarClicked = true;
    this.nuevoExperiencia = { ...experiencia };
  }

  onRegistrarClick(): void {
    this.editarClicked = false;
  }


  createExperiencia() {
    this.nuevoExperienciaCarga.cedulaGraduado = this.cedula;

    this.editarClicked = false;

    if (!this.validateExperienciaFields()) {
      this.mostrarSweetAlert(false, 'Por favor, completa todos los campos obligatorios.');
      return;
    }

    this.experienciaService.createExperiencia(this.nuevoExperienciaCarga).subscribe(
      experiencia => {
        console.log('Experiencia creada exitosamente:', experiencia);
        this.loadExperiencias();
        this.mostrarSweetAlert(true, 'La experiencia se ha guardado exitosamente.');
        this.mensajeMostrado = true;
      },
      error => {
        console.error('Error al crear la experiencia:', error);
        this.mostrarSweetAlert(false, 'Hubo un error al intentar guardar la experiencia.');
      }
    );
  }

  onUpdateClick(id: number) {
    id = 2;
    console.log('ID de la experiencia:', id);

    this.nuevoExperienciaCarga.cedulaGraduado = this.cedula;
    this.experienciaService.updateExperiencia(id, this.nuevoExperienciaCarga).subscribe(
      refeActualizado => {
        console.log('Experiencia actualizada exitosamente:', refeActualizado);
        this.mostrarSweetAlert(true, 'La experiencia se ha actualizado exitosamente.');
        this.loadExperiencias();
      },
      error => {
        console.error('Error al actualizar la experiencia:', error);
        this.mostrarSweetAlert(false, 'Error al actualizar la experiencia.');
      }
    );
  }

  onDeleteClick(id: number) {
    this.experienciaService.deleteExperiencia(id).subscribe(
      () => {
        console.log('Experiencia eliminada exitosamente');
        this.mostrarSweetAlert(true, 'La experiencia se ha eliminado exitosamente.');
        this.loadExperiencias();
      },
      error => {
        console.error('Error al eliminar la experiencia:', error);
        this.mostrarSweetAlert(false, 'Error al eliminar la experiencia.');
      }
    );
  }

  obtenerCedula() {
    const userDataString = localStorage.getItem('user_data');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.cedula = userData.persona.cedula;
    }
    console.log('Cédula del usuario:', this.cedula);
  }

  cerrarModal() {
    if (this.mensajeMostrado) {
      this.bsModalRef.hide();
    } else {
      console.log('Espera a que se muestre el mensaje antes de cerrar la modal.');
    }
  }
}