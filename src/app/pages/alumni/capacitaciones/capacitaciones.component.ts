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

  mensajeMostrado = false;
  idEdit: number = 0;

  @Output() onClose: EventEmitter<string> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef, private capacitacionesService: CapacitacionService) { }

  ngOnInit(): void {

    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      lengthChange: true,
      language: {
        search: 'Buscar:',
        searchPlaceholder: 'Buscar capacitación ...',
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
    this.loadData();
  }

  loadData() {
    this.capacitacionesService.getCapacitaciones().subscribe(
      capacitacion => {
        this.capacitacionList = capacitacion;
        console.log('Capacitaciones:', capacitacion);
      },
      (error: any) => console.error(error),
      () => this.dtTrigger.next(null)
    );
  }

  createReferenciaPer() {
    this.capacitacion.cedula = this.cedula;

    this.editarClicked = false;

    this.capacitacionesService.createCapacitacion(this.capacitacion).subscribe(
      referenciasP => {
        console.log('Capacitación creada exitosamente:', referenciasP);
        this.loadData();
        this.mostrarSweetAlert(true, 'La capacitación se ha guardado exitosamente.');
        this.mensajeMostrado = true;
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

  onRegistrarClick(): void {
    this.editarClicked = false;
  }

  onUpdateClick() {
    this.capacitacionCarga.cedula = this.cedula;

    this.capacitacionesService.updateCapacitacion(this.idEdit, this.capacitacionCarga).subscribe(
      refeActualizado => {
        this.capacitacion = refeActualizado;
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

  obtenerCedula() {
    const userDataString = localStorage.getItem('user_data');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.cedula = userData.persona.cedula;
    }
  }

  cerrarModal() {
    if (this.mensajeMostrado) {
      this.bsModalRef.hide();
    } else {
      console.log('Espera a que se muestre el mensaje antes de cerrar la modal.');
    }
  }
}