import { Component, EventEmitter, Output } from '@angular/core';
import { OfertalaboralService } from '../../../data/service/ofertalaboral.service';
import { Empresa } from '../../../data/model/empresa';
import { EmpresaService } from '../../../data/service/empresa.service';
import { error } from 'jquery';
import { ofertaLaboralDTO } from '../../../Models/ofertaLaboralDTO';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-postulaciones-add-form',
  templateUrl: './ofertas-laborales.component.html',
  styleUrls: ['./ofertas-laborales.component.css', '../../../../assets/prefabs/headers.css']
})
export class OfertasLaboralesComponent {

  editarClicked = false;
  idEdit: number = 0;
  onRegistrarClick(): void {
    this.editarClicked = false;
  }

  onEditarClick(id: number | undefined = 0): void {
    this.editarClicked = true;
    //this.ofertaslaboralesCarga = { ...ofertalaboral};
    this.getOfertaLaboralById(id);
    this.idEdit = id;
  }

  ofertaslaborales: any = {};
  ofertaslaboralesCarga: any = {};
  ofertaslaboraleslist: ofertaLaboralDTO[] = [];
  empresas: Empresa[] = [];
  fechaPublicacion: String = '';

  @Output() onClose: EventEmitter<string> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef, private ofertalaburoService: OfertalaboralService, private empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.getAllEmpresas();
    this.getAllOfertasLaborales();

    this.ofertaslaborales = {
      id: 0,
      salario: 0,
      fechaCierre: '',
      fechaPublicacion: '',
      cargo: '',
      experiencia: '',
      fechaApertura: '',
      areaConocimiento: '',
      estado: '',
      nombreEmpresa: '',
      correoGraduado: [],

    };

    this.ofertaslaboralesCarga = {
      id: 0,
      salario: 0,
      fechaCierre: '',
      fechaPublicacion: '',
      cargo: '',
      experiencia: '',
      fechaApertura: '',
      areaConocimiento: '',
      estado: '',
      nombreEmpresa: '',
      correoGraduado: [],

    };
    this.getFechaPublicacion();
    this.ofertaslaborales.estado = false;
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

  validateOfertasPerFields(): boolean {
    if (!this.ofertaslaborales.salario || !this.ofertaslaborales.fechaCierre || !this.ofertaslaborales.fechaPublicacion|| !this.ofertaslaborales.cargo || !this.ofertaslaborales.experiencia || !this.ofertaslaborales.fechaApertura || !this.ofertaslaborales.areaConocimiento || !this.ofertaslaborales.estado || !this.ofertaslaborales.nombreEmpresa) {
      return false;
    }

    return true;
  }
  validateOfertasCargaPerFields(): boolean {
    if (!this.ofertaslaboralesCarga.salario || !this.ofertaslaboralesCarga.fechaCierre || !this.ofertaslaboralesCarga.fechaPublicacion|| !this.ofertaslaboralesCarga.cargo || !this.ofertaslaboralesCarga.experiencia || !this.ofertaslaboralesCarga.fechaApertura || !this.ofertaslaboralesCarga.areaConocimiento || !this.ofertaslaboralesCarga.estado || !this.ofertaslaboralesCarga.nombreEmpresa) {
      return false;
    }

    return true;
  }

  getFechaPublicacion() {
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Agrega un cero si el mes es de un solo dígito
    const day = currentDate.getDate().toString().padStart(2, '0'); // Agrega un cero si el día es de un solo dígito
    const year = currentDate.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;

    this.fechaPublicacion = formattedDate;
    if (this.editarClicked == true) {
      this.ofertaslaborales.fechaPublicacion = new Date(formattedDate);

    } else {
      this.ofertaslaboralesCarga.fechaPublicacion = new Date(formattedDate);
    }
    console.log(formattedDate);
  }
  /*
  getFechaPublicacion1() {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'mm/dd/yyyy');
    this.ofertaslaborales.fechaPublicacion = formattedDate || ''; // Asegúrate de manejar el caso en el que formattedDate sea nulo
    console.log(formattedDate);
  }*/


  getAllEmpresas() {
    this.empresaService.getEmpresas().subscribe(
      empresass => this.empresas = empresass,
      error => console.error(error)
    )
  }

  getAllOfertasLaborales() {
    this.ofertalaburoService.getOfertasLaborales().subscribe(
      ofertas => this.ofertaslaboraleslist = ofertas,
      error => console.error(error)
    )
  }

  deleteOfertaLaboral(id: number | undefined = 0) {
    // Mostrar SweetAlert de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, eliminar la empresa
        this.ofertalaburoService.deleteOfertabyID(id).subscribe(
          () => {
            // Mostrar SweetAlert de éxito
            Swal.fire({
              icon: 'success',
              title: 'Eliminado exitosamente',
              text: 'La empresa ha sido eliminada correctamente.',
            });
            // Puedes agregar más acciones después de eliminar, si es necesario
          },
          error => {
            // Mostrar SweetAlert de error
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text: 'Hubo un error al intentar eliminar la empresa.',
            });
            console.error('Error al eliminar empresa:', error);
          }
        );
      }
    });
  }

  createOfertaLaboral() {
    if (!this.validateOfertasPerFields()) {
      this.mostrarSweetAlert(false, 'Por favor, completa todos los campos son obligatorios.');
      return;
    }
    this.ofertalaburoService.createOfertaLaboral(this.ofertaslaborales).subscribe(
      (response) => {
        console.log(response);
        this.ofertaslaborales = response;
        this.mostrarSweetAlert(true, 'La oferta laboral se ha creado exitosamente.');

      },
      (error) => {
        console.error(error);
        this.mostrarSweetAlert(true, 'La oferta laboral no se ha creado.');

      }
    );
  }

  updateOfertaLaboral() {
    console.log('Almeja', this.idEdit, this.ofertaslaboralesCarga);
    if (!this.validateOfertasCargaPerFields()) {
      this.mostrarSweetAlert(false, 'Por favor, completa todos los campos son obligatorios.');
      return;
    }
    this.ofertalaburoService.updateOfertaLaboral(this.idEdit, this.ofertaslaboralesCarga).subscribe(
      (response) => {
        console.log(response);
        this.ofertaslaborales = response;
        this.mostrarSweetAlert(true, 'La oferta laboral se ha actualizado exitosamente.');

      },
      (error) => {
        console.error(error);
        this.mostrarSweetAlert(false, 'La Oferta Laboral no se ha podido actualizar.');

      }
    );
  }

  getOfertaLaboralById(id: number) {
    this.ofertalaburoService.getOfertaLaboralByIdToDTO(id).subscribe(
      ofertas => this.ofertaslaboralesCarga = ofertas,
      error => console.error(error)
    )
  }
}