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
  name: string | null = localStorage.getItem('name');
  usuarios: Usuario | any = [];

  graduado: Graduado | any = [];
  empresa: Empresa | any = [];

  experiencia: Experiencia[] = [];
  nuevoExperiencia: Experiencia = { graduado: this.graduado, cargo: '', duracion: '', institucionNombre: '', actividad: '' };
  nuevoExperienciaCarga: Experiencia = { id: 0, graduado: this.graduado, cargo: '', duracion: '', institucionNombre: '', actividad: '' };
  nuevoExperienciaEdit: Experiencia = { id: 0, graduado: this.graduado, cargo: '', duracion: '', institucionNombre: '', actividad: '' };
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

    this.obtenerUsuario();
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

  createExperiencia() {
    this.editarClicked = false;
    this.experienciaService.createExperiencia(this.nuevoExperiencia).subscribe(
      experiencia => {
        console.log('Experiencia creada exitosamente:', experiencia);
        this.loadExperiencias();
        this.mostrarSweetAlert(true);
        this.mensajeMostrado = true;
      },
      error => {
        console.error('Error al crear la experiencia:', error);
        this.mostrarSweetAlert(false);
      }
    );
  }

  mostrarSweetAlert(esExitoso: boolean) {
    const titulo = esExitoso ? 'Completado exitosamente' : 'Error al guardar';
    const mensaje = esExitoso ? 'La experiencia se ha guardado exitosamente.' : 'Hubo un error al intentar guardar la experiencia.';

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

  cerrarModal() {
    if (this.mensajeMostrado) {
      this.bsModalRef.hide();
    } else {
      console.log('Espera a que se muestre el mensaje antes de cerrar la modal.');
    }
  }
}