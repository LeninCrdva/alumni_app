import { Component, EventEmitter, Output } from "@angular/core";
import { Referencias_profesionales } from "../../../data/model/referencia_profesional";
import { ReferenciaProfesionalService } from "../../../data/service/referenciaprofesional.service";
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-referencias-laborales',
  templateUrl: './referencias-laborales.component.html',
  styleUrls: ['./referencias-laborales.component.css', '../../../../assets/prefabs/headers.css']
})
export class ReferenciasLaboralesComponent {
  public cedula: string = '';

  referencia_profesional: Referencias_profesionales = { graduado: '', institucion: '', email: '', nombre: '' };
  referenciaProfesionalCarga: Referencias_profesionales = { id: 0, graduado: '', institucion: '', email: '', nombre: '' };
  referenciaProfesionalList: Referencias_profesionales[] = [];
  editarClicked = false;

  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  idEdit: number = 0;

  @Output() onClose: EventEmitter<string> = new EventEmitter();

  constructor(private referenciaProService: ReferenciaProfesionalService) { }

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
    this.referenciaProService.getReferenciasProfesionales().subscribe(
      referencias => {
        this.referenciaProfesionalList = referencias.filter(referencia => referencia.graduado === this.cedula);
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
    this.referencia_profesional.graduado = this.cedula;
    this.editarClicked = false;

    this.referenciaProService.createReferenciasProfesionales(this.referencia_profesional).subscribe(
      referenciasP => {
        console.log('Refencia profesional creada exitosamente:', referenciasP);
        this.loadData();
        this.mostrarSweetAlert(true, 'La referencia profesional se ha guardado exitosamente.');
      },
      error => {
        console.error('Error al crear la refencia profesional:', error)
        this.mostrarSweetAlert(false, 'Hubo un error al intentar guardar la referencia profesional.');
      }
    );
  }

  onEditarClick(id: number | undefined = 0): void {
    this.editarClicked = true;
    this.referenciaProService.getReferenciasProfesionalesById(id).subscribe(
      refe => this.referenciaProfesionalCarga = refe,
      error => console.error(error)
    )
    this.idEdit = id;
  }

  onUpdateClick() {
    this.referenciaProfesionalCarga.graduado = this.cedula;

    this.referenciaProService.updateReferenciasProfesionales(this.idEdit, this.referenciaProfesionalCarga).subscribe(
      refeActualizado => {
        console.log('Referencia personal actualizado exitosamente:', refeActualizado);
        this.referencia_profesional = refeActualizado;
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
    this.referenciaProService.deleteReferenciasProfesionales(id).subscribe(
      () => {
        console.log('Experiencia eliminada exitosamente');
        this.mostrarSweetAlert(true, 'La experiencia se ha eliminado exitosamente.');
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