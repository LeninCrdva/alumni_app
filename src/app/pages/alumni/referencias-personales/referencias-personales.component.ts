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

  referencia_personal: Referencias_personales = { nombreReferencia: '', cedulaGraduado: '', telefono: '', email: '' };
  referenciaPersonalCarga: Referencias_personales = { id: 0, nombreReferencia: '', cedulaGraduado: '', telefono: '', email: '' };
  referenciaPersonalList: Referencias_personales[] = [];
  editarClicked = false;

  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  idEdit: number = 0;

  @Output() onClose: EventEmitter<string> = new EventEmitter();

  constructor(private referenciaPService: ReferenciaPersonalService) { }

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
        searchPlaceholder: 'Buscar referencia...',
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
  this.referenciaPService.getReferenciasPersonales().subscribe(
    referenciasP => {
      // Filtrar las referencias personales por cédula
      this.referenciaPersonalList = referenciasP.filter(referenciaP => referenciaP.cedulaGraduado === this.cedula);
      this.dtTrigger.next(null);
    },
    (error: any) => console.error(error)
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
      this.createNewData(); // Lógica de creación
    }
  }

  createNewData() {
    this.referencia_personal.cedulaGraduado = this.cedula;
    this.editarClicked = false;

    this.referenciaPService.createReferenciasPersonales(this.referencia_personal).subscribe(
      referenciasP => {
        console.log('Refencia personal creada exitosamente:', referenciasP);
        this.loadData();
        this.mostrarSweetAlert(true, 'La referencia personal se ha guardado exitosamente.');
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

  onUpdateClick() {
    this.referenciaPersonalCarga.cedulaGraduado = this.cedula;

    this.referenciaPService.updateReferenciasPersonales(this.idEdit, this.referenciaPersonalCarga).subscribe(
      refeActualizado => {
        console.log('Referencia personal actualizado exitosamente:', refeActualizado);
        this.referencia_personal = refeActualizado;
        this.mostrarSweetAlert(true, 'La referencia personal se ha actualizado exitosamente.');
        this.loadData();
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
        console.log('Referencia personal eliminada exitosamente');
        this.mostrarSweetAlert(true, 'La referencia personal se ha eliminado exitosamente.');
        this.loadData();
      },
      error => {
        console.error('Error al eliminar la referencia personal:', error);
        this.mostrarSweetAlert(false, 'Error al eliminar la referencia personal.');
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