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

  referencia_profesional: Referencias_profesionales[] = [];
  nuevoReferenciaProfesional: Referencias_profesionales = { cedulaGraduado: '', nombreInstitucion: '', email: '', nombreReferencia: '' };
  nuevoReferenciaProfesionalCarga: Referencias_profesionales = { id: 0, cedulaGraduado: '', nombreInstitucion: '', email: '', nombreReferencia: '' };
  nuevoReferenciaProfesionalEdit: Referencias_profesionales = { id: 0, cedulaGraduado: '', nombreInstitucion: '', email: '', nombreReferencia: '' };
  editarClicked = false;

  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  mensajeMostrado = false;

  @Output() onClose: EventEmitter<string> = new EventEmitter();

  idEdit: number = 0;

  constructor(public bsModalRef: BsModalRef, private referenciaProService: ReferenciaProfesionalService) { }

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
    this.loadReferenciaPro();
  }

  onEditarClick(id: number | undefined = 0): void {
    this.editarClicked = true;

    this.referenciaProService.getReferenciasProfesionalesById(id).subscribe(
      refe => this.nuevoReferenciaProfesionalCarga = refe,
      error => console.error(error)
    )

    this.idEdit = id;
  }

  onRegistrarClick(): void {
    this.editarClicked = false;
  }

  loadReferenciaPro() {
    this.referenciaProService.getReferenciasProfesionales().subscribe(
      referenciasP => {
        this.referencia_profesional = referenciasP;
      },
      (error: any) => console.error(error),
      () => this.dtTrigger.next(null)
    );
  }

  createReferenciaPro() {
    this.nuevoReferenciaProfesional.cedulaGraduado = this.cedula;

    this.editarClicked = false;

    if (!this.validateReferenciasProFields()) {
      this.mostrarSweetAlert(false, 'Por favor, completa todos los campos obligatorios.');
      return;
    }

    this.referenciaProService.createReferenciasProfesionales(this.nuevoReferenciaProfesional).subscribe(
      refe => {
        console.log('La referencia laboral creada exitosamente:', refe);
        this.loadReferenciaPro();
        this.mostrarSweetAlert(true, 'La referencia laboral se ha guardado exitosamente.');
        this.mensajeMostrado = true;
      },
      error => {
        console.error('Error al crear la referencia laboral:', error);
        this.mostrarSweetAlert(false, 'Hubo un error al intentar guardar la referencia laboral.');
      }
    );
  }

  onUpdateClick() {
    this.nuevoReferenciaProfesionalCarga.cedulaGraduado = this.cedula;
    this.referenciaProService.updateReferenciasPersonales(this.idEdit, this.nuevoReferenciaProfesionalCarga).subscribe(
      refeActualizado => {
        console.log('Experiencia actualizada exitosamente:', refeActualizado);
        this.mostrarSweetAlert(true, 'La referencia laboral se ha actualizado exitosamente.');
        this.loadReferenciaPro();
      },
      error => {
        console.error('Error al actualizar la referencia laboral:', error);
        this.mostrarSweetAlert(false, 'Error al actualizar la referencia laboral.');
      }
    );
  }

  onDeleteClick(id: number) {
    this.referenciaProService.deleteReferenciasPersonales(id).subscribe(
      () => {
        console.log('Referencia laboral eliminada exitosamente');
        this.mostrarSweetAlert(true, 'La referencia laboral se ha eliminado exitosamente.');
        this.loadReferenciaPro();
      },
      error => {
        console.error('Error al eliminar la referencia laboral:', error);
        this.mostrarSweetAlert(false, 'Error al eliminar la referencia laboral.');
      }
    );
  }

  validateReferenciasProFields(): boolean {
    if (!this.nuevoReferenciaProfesionalCarga.nombreReferencia || !this.nuevoReferenciaProfesionalCarga.nombreInstitucion || !this.nuevoReferenciaProfesionalCarga.email) {
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