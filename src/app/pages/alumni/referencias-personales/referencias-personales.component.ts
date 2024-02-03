import { Component, EventEmitter, Output } from '@angular/core';
import { Referencias_personales } from '../../../data/model/referencia_personal';
import { Graduado } from '../../../data/model/graduado';
import { ReferenciaPersonalService } from '../../../data/service/referenciapersonal.service';
import { UserService } from '../../../data/service/UserService';
import { Usuario } from '../../../data/model/usuario';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-referencias-personales',
  templateUrl: './referencias-personales.component.html',
  styleUrls: ['./referencias-personales.component.css', '../../../../assets/prefabs/headers.css']
})
export class ReferenciasPersonalesComponent {
  public cedula: string = '';

  referencia_personal: Referencias_personales = { nombre: '', cedulaGraduado: '', telefono: '', email: '' };
  referenciaPersonalCarga: Referencias_personales = { id: 0, nombre: '', cedulaGraduado: '', telefono: '', email: '' };
  referenciaPersonalList: Referencias_personales[] = [];

  editarClicked = false;
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  mensajeMostrado = false;
  idEdit: number = 0;

  @Output() onClose: EventEmitter<string> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef, private referenciaPService: ReferenciaPersonalService, private usuarioService: UserService) { }

  ngOnInit(): void {

    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      lengthChange: true,
      language: {
        search: 'Buscar:',
        searchPlaceholder: 'Buscar referencia ...',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
        infoEmpty: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
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
    this.loadReferenciasPer();
  }

  loadReferenciasPer() {
    this.referenciaPService.getReferenciasPersonales().subscribe(
      referenciasP => {
        this.referenciaPersonalList = referenciasP;
      },
      (error: any) => console.error(error),
      () => this.dtTrigger.next(null)
    );
  }

  createReferenciaPer() {
    this.referencia_personal.cedulaGraduado = this.cedula;

    this.editarClicked = false;


    if (!this.validateReferenciasPerFields()) {
      this.mostrarSweetAlert(false, 'Por favor, completa todos los campos son obligatorios.');
      return;
    }

    this.referenciaPService.createReferenciasPersonales(this.referencia_personal).subscribe(
      referenciasP => {
        console.log('Refencia personal creada exitosamente:', referenciasP);
        this.loadReferenciasPer();
        this.mostrarSweetAlert(true, 'La referencia laboral se ha guardado exitosamente.');
        this.mensajeMostrado = true;
      },
      error => {
        console.error('Error al crear la refencia personal:', error)
        this.mostrarSweetAlert(false, 'Hubo un error al intentar guardar la referencia personal.');
      }
    );
  }

  onEditarClick(id: number | undefined = 0): void {
    this.editarClicked = true;
    this.referenciaPService.getReferenciasPersonalesById(id).subscribe(
      refe => this.referenciaPersonalCarga = refe,
      error => console.error(error)
    )
    this.idEdit = id;
  }

  onRegistrarClick(): void {
    this.editarClicked = false;
  }

  onUpdateClick() {
    this.referenciaPersonalCarga.cedulaGraduado = this.cedula;
    
    console.log('ID de la referencia personal:', this.referenciaPersonalCarga.cedulaGraduado);
    console.log('ID de la referencia personal:', this.referenciaPersonalCarga.id);
    console.log('ID de la referencia personal:', this.referenciaPersonalCarga.nombre);
    console.log('ID de la referencia personal:', this.referenciaPersonalCarga.telefono);
    console.log('ID de la referencia personal:', this.referenciaPersonalCarga.email);
    this.referenciaPService.updateReferenciasPersonales(this.idEdit, this.referenciaPersonalCarga).subscribe(
      refeActualizado => {
        console.log('Sector actualizado exitosamente:', refeActualizado);
        this.referencia_personal = refeActualizado;
        this.mostrarSweetAlert(true, 'La referencia personal se ha actualizado exitosamente.');
        this.loadReferenciasPer();
      },
      error => {
        console.error('Error al actualizar la referencia personal:', error);
        this.mostrarSweetAlert(false, 'Error al actualizar la referencia personal.');
      }
    );
  }

  onDeleteClick(id: number | undefined = 0) {
    this.referenciaPService.deleteReferenciasPersonales(id).subscribe(
      () => {
        console.log('Experiencia eliminada exitosamente');
        this.mostrarSweetAlert(true, 'La experiencia se ha eliminado exitosamente.');
        this.loadReferenciasPer();
      },
      error => {
        console.error('Error al eliminar la referencia personal:', error);
        this.mostrarSweetAlert(false, 'Error al eliminar la referencia personal.');
      }
    );
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

  validateReferenciasPerFields(): boolean {
    if (!this.referencia_personal.nombre || !this.referencia_personal.telefono || !this.referencia_personal.email) {
      return false;
    }

    return true;
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