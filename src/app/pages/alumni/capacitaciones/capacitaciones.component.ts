import { Component, EventEmitter, Output } from '@angular/core';
import { Capacitacion } from '../../../data/model/capacitacion';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CapacitacionService } from '../../../data/service/capacitacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-capacitaciones',
  templateUrl: './capacitaciones.component.html',
  styleUrls: ['./capacitaciones.component.css', '../../../../assets/prefabs/headers.css']
})
export class CapacitacionesComponent {
  public cedula: string = '';

  capacitacion: Capacitacion = { nombre: '', cedula: this.cedula, institucion: '', tipoCertificado: '', numHoras: 0, fechaInicio: new Date(), fechaFin: new Date() };
  capacitacionCarga: Capacitacion = { id: 0, nombre: '', cedula: this.cedula, institucion: '', tipoCertificado: '', numHoras: 0, fechaInicio: new Date(), fechaFin: new Date() };
  capacitacionList: Capacitacion[] = [];
  editarClicked = false;

  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  idEdit: number = 0;

  @Output() onClose: EventEmitter<string> = new EventEmitter();

  constructor(private capacitacionesService: CapacitacionService) { }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.obtenerCedula();
    this.loadData();
    this.setupDtOptions();
  }

  setupDtOptions() {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      lengthChange: true,
      language: {
        search: 'Buscar:',
        searchPlaceholder: 'Buscar capacitación...',
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
  }

  // NOTE: MOSTRAR LISTA DE EXPERIENCIAS

  loadData() {
    this.capacitacionesService.getCapacitaciones().subscribe(
      capacitacion => {
        this.capacitacionList = capacitacion;
      },
      (error: any) => console.error(error),
      () => this.dtTrigger.next(null)
    );
  }

  // NOTE: CRUD EVENTS
  onRegistrarClick(): void {
    this.editarClicked = false;
  }

  onSubmit() {
    if (this.editarClicked) {
      this.onUpdateClick(); // Lógica de actualización
    } else {
      this.createExperiencia(); // Lógica de creación
    }
  }

  createExperiencia() {
    this.capacitacion.cedula = this.cedula;

    this.editarClicked = false;

    this.capacitacionesService.createCapacitacion(this.capacitacion).subscribe(
      newData => {
        console.log('Capacitación creada exitosamente:', newData);
        this.loadData();
        this.mostrarSweetAlert(true, 'La capacitación se ha guardado exitosamente.');
      },
      error => {
        console.error('Error al crear la Capacitación:', error)
        this.mostrarSweetAlert(false, 'Hubo un error al intentar guardar la capacitación.');
      }
    );
  }

  onEditarClick(id: number | undefined = 0): void {
    this.editarClicked = true;

    this.capacitacionesService.getCapacitacionById(id).subscribe(
      refe => this.capacitacionCarga = refe,
      error => console.error(error)
    )
    this.idEdit = id;
  }

  onUpdateClick() {
    this.capacitacionCarga.cedula = this.cedula;

    this.capacitacionesService.updateCapacitacion(this.idEdit, this.capacitacionCarga).subscribe(
      updateData => {
        this.capacitacion = updateData;
        this.mostrarSweetAlert(true, 'La referencia personal se ha actualizado exitosamente.');
        this.loadData();
      },
      error => {
        this.mostrarSweetAlert(false, 'Error al actualizar la capacitación.');
      }
    );
  }

  onDeleteClick(id: number | undefined = 0) {
    this.capacitacionesService.deleteCapacitacion(id).subscribe(
      () => {
        this.mostrarSweetAlert(true, 'La capacitacion se ha eliminado exitosamente.');
        this.loadData();
      },
      error => {
        this.mostrarSweetAlert(false, 'Error al eliminar la capacitación.');
      }
    );
  }

  // NOTE: VALIDACIONES

  validarNumero(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  allowOnlyLetters(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);
    const lettersRegex = /^[a-zA-Z]+$/;

    if (!lettersRegex.test(inputChar)) {
      event.preventDefault();
    }
  }

  allowOnlyNumbers(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
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
      }
    });
  }

  obtenerCedula() {
    const userDataString = localStorage.getItem('user_data');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.cedula = userData.persona.cedula;
    }
  }
}