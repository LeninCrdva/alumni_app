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

  referencia_personal: Referencias_personales[] = [];
  nuevoReferenciaPersonal: Referencias_personales = { nombre: '', cedulaGraduado: '', telefono: '', email: '' };
  nuevoReferenciaPersonalCarga: Referencias_personales = { id: 0, nombre: '', cedulaGraduado: '', telefono: '', email: '' };
  nuevoReferenciaPersonalEdit: Referencias_personales = { id: 0, nombre: '', cedulaGraduado: '', telefono: '', email: '' };

  editarClicked = false;
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  mensajeMostrado = false;

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
        this.referencia_personal = referenciasP;
      },
      (error: any) => console.error(error),
      () => this.dtTrigger.next(null)
    );
  }

  createReferenciaPer() {
    this.editarClicked = false;
    this.referenciaPService.createReferenciasPersonales(this.nuevoReferenciaPersonal).subscribe(
      referenciasP => {
        console.log('Refencia personal creada exitosamente:', referenciasP);
        this.loadReferenciasPer();
      },
      error => console.error('Error al crear la refencia personal:', error)
    );
  }

  onEditarClick(referenciasP: Referencias_personales): void {
    this.editarClicked = true;
    this.nuevoReferenciaPersonal = { ...referenciasP };
  }

  onRegistrarClick(): void {
    this.editarClicked = false;
  }

  onUpdateClick(ids: number) {
    const id = this.nuevoReferenciaPersonalCarga.id;
    if (id !== undefined) {
      this.referenciaPService.updateReferenciasPersonales(id, this.nuevoReferenciaPersonalCarga).subscribe(
        refeActualizado => {
          console.log('Sector actualizado exitosamente:', refeActualizado);

          this.loadReferenciasPer();
        },
        error => console.error('Error al actualizar el titulo:', error)
      );
    } else {
      console.error('Error: El ID del titulo es undefined.');
    }
  }

  onDeleteClick(id: number) {

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
