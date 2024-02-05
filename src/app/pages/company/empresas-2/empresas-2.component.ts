import { Component, EventEmitter, Output } from '@angular/core';
import { Empresa } from '../../../data/model/empresa';
import { Ciudad } from '../../../data/model/ciudad';
import { sectorempresarial } from '../../../data/model/sectorEmpresarial';
import { EmpresaService } from '../../../data/service/empresa.service';
import { CiudadService } from '../../../data/service/ciudad.service';
import { SectorEmpresarialService } from '../../../data/service/sectorempresarial.service';
import { Empresario } from '../../../data/model/empresario';
import { Usuario } from '../../../data/model/usuario';
import { EmpresarioService } from '../../../data/service/empresario.service';
import { Provincia } from '../../../data/model/provincia';
import Swal from 'sweetalert2';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-empresas-2',
  templateUrl: './empresas-2.component.html',
  styleUrls: ['./empresas-2.component.css', '../../../../assets/prefabs/headers.css', '../../../../assets/prefabs/headers.css']
})
export class Empresas2Component {

  editarClicked = false;
  idEdit: number = 0;
  onEditarClick(id: number | undefined = 0): void {
    this.editarClicked = true;
    this.idEdit = id || 0;  // Asignar 0 si id es undefined
    console.log('ID a editar:', this.idEdit);
    this.getEmpresaById(this.idEdit);
 }
 

  onRegistrarClick(): void {
    this.editarClicked = false;

  }

  //ID del usuario logueado
  idUser: number = parseInt(localStorage.getItem('idUser') || '0', 10);
  //Para obtener el empresario del usuario logueado
  public empresariouser: string | undefined = '';
  //Para ciudad y sector empresarial
  ciudadSeleccionada: any = {};
  sectorSeleccionado: any = {};
  //Para obtener el empresario del usuario logueado
  empresass: Empresa[] = [];
  empresanueva: any = {};
  empresacargar: any = {};
  ciudades: Ciudad[] = [];
  sectoresEmpresariales: sectorempresarial[] = [];

  ID_Ciudad: number = 0;
  ID_Sector: number = 0;

  @Output() onClose: EventEmitter<string> = new EventEmitter();


  constructor(public bsModalRef: BsModalRef
    ,private cd: ChangeDetectorRef, private empresaService: EmpresaService, private ciudadService: CiudadService, private sectorempresarialService: SectorEmpresarialService, private serviceempresario: EmpresarioService) { }

  ngOnInit(): void {

    this.ciudadSeleccionada = {
      id: 0,
      nombre: '',
      provincia: new Provincia(),
    }
    this.sectorSeleccionado = {
      id: 0,
      nombre: '',
      descripcion: '',
    }
    this.empresanueva = {
      empresario: '', // O el valor por defecto que desees
      ciudad: new Ciudad(),
      sectorEmpresarial: new sectorempresarial(),
      ruc: '',
      nombre: '',
      tipoEmpresa: '',
      razonSocial: '',
      area: '',
      ubicacion: '',
      sitioWeb: '',
      // O el valor por defecto que desees
    };
    this.empresacargar = {
      empresario: '', // O el valor por defecto que desees
      ciudad: new Ciudad(),
      sectorEmpresarial: new sectorempresarial(),
      ruc: '',
      nombre: '',
      tipoEmpresa: '',
      razonSocial: '',
      area: '',
      ubicacion: '',
      sitioWeb: '',
      // O el valor por defecto que desees  
    };

    this.serviceempresario.getEmpresario().subscribe(
      empresario => {
        if (empresario?.usuario !== undefined) {
          localStorage.setItem('empresariouser', empresario.usuario);
          // Recupera el valor almacenado en localStorage
          const storedEmpresariouser = localStorage.getItem('empresariouser');
          
          this.cd.detectChanges();
          // Comprueba si el valor no es null antes de asignarlo a this.empresariouser
          if (storedEmpresariouser !== null) {
            // Convierte el valor a mayúsculas antes de asignarlo a this.empresariouser
            this.empresariouser = storedEmpresariouser.toUpperCase();
            console.log('Valor almacenado en localStorage (mayúsculas):', this.empresariouser);

            // Ahora puedes usar this.empresariouser en tu lógica posterior
          } else {
            console.log('No hay valor almacenado en localStorage para la clave "empresariouser".');
          }


        }

        // Log para imprimir datos antes de la solicitud
        console.log('Datos enviados al método getEmpresasbyUser:', this.empresariouser);
        
        this.buscarEmpresas();
       
      },
      error => console.error('Error al obtener el empresario:', error)
    );


    this.getCiudadIDName();
    this.getSectoresEmpresariales();

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
  validateEmpresasPerFields(): boolean {
    if (!this.empresanueva.ruc || !this.empresanueva.nombre || !this.empresanueva.tipoEmpresa || !this.empresanueva.razonSocial || !this.empresanueva.area || !this.empresanueva.ubicacion || !this.empresanueva.sitioWeb || !this.empresanueva.ciudad || !this.empresanueva.sectorEmpresarial) {
      return false;
    }

    return true;
  }
  validateEmpresasPerFieldsEdicion(): boolean {
    if (!this.empresacargar.ruc || !this.empresacargar.nombre || !this.empresacargar.tipoEmpresa || !this.empresacargar.razonSocial || !this.empresacargar.area || !this.empresacargar.ubicacion || !this.empresacargar.sitioWeb || !this.empresacargar.ciudad || !this.empresacargar.sectorEmpresarial) {
      return false;
    }

    return true;
  }


  crearEmpresa() {
    if (!this.validateEmpresasPerFields()) {
      this.mostrarSweetAlert(false, 'Por favor, completa todos los campos son obligatorios.');
      return;
    }
    if (this.empresanueva) { // Add null check for this.ciudadSeleccionada
      this.empresanueva.empresario = this.empresariouser;
      console.log('Empresario:', this.empresanueva.empresario);
      console.log('Empresario1111:', this.empresanueva);

      this.empresaService.createEmpresa(this.empresanueva).subscribe(
        empresa => {

          console.log('Empresa creada exitosamente:', empresa);
          this.mostrarSweetAlert(true, 'La empresa se ha guardado exitosamente.');
          this.empresanueva = this.createEmpresaVacia(); // Limpiar el formulario
        },
        error => {
          console.error('Error al crear la empresa:', error);
          this.mostrarSweetAlert(false, 'Hubo un error al intentar guardar la referencia personal.');
        }
      );
    }
  }


  editarEmpresa() {
    // Verificar si this.empresacargar es válido
    if (!this.empresacargar) {
      console.error('Error: this.empresacargar es null o undefined.');
      return;
    }

    // Verificar si this.idEdit es válido
    if (this.idEdit <= 0) {
      console.error('Error: this.idEdit no es un valor válido.');
      return;
    }

    if (!this.validateEmpresasPerFieldsEdicion()) {
      this.mostrarSweetAlert(false, 'Por favor, completa todos los campos son obligatorios.');
      return;
    }
    this.editarClicked = true;
    console.log('Editar clicked:', this.editarClicked);

    // Asignar el empresario antes de actualizar
    this.empresacargar.empresario = this.empresariouser;
    console.log('Empresa a editar:', this.empresacargar);

    // Llamar al servicio para actualizar la empresa
    this.empresaService.updateEmpresa(this.idEdit, this.empresacargar).subscribe(
      empresaActualizada => {
        console.log('Empresa actualizada exitosamente:', empresaActualizada);
        this.mostrarSweetAlert(true, 'La empresa se ha actualizado exitosamente.');
        this.empresacargar = this.createEmpresaVacia(); // Limpiar el formulario
      },
      error => {
        console.error('Error al actualizar empresa:', error);
        this.mostrarSweetAlert(false, 'La empresa no se ha actualizado');
      }
    );
  }

  deleteEmpresa(id: number | undefined = 0) {
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
        this.empresaService.deleteEmpresa(id).subscribe(
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


  getCiudadIDName() {
    this.ciudadService.getCiudades().subscribe(
      ciudades => this.ciudades = ciudades,
      error => console.error(error)
    );
  }


  getSectoresEmpresariales() {
    this.sectorempresarialService.getSectoresEmpresariales().subscribe(
      sectores => this.sectoresEmpresariales = sectores,
      error => console.error(error)
    );
  }

  buscarCiudad(id: number) {
    this.ciudadService.getCiudadById(id).subscribe(
      ciudad => {
        if (ciudad) {
          console.log('Ciudad:', ciudad);
          //this.ciudadSeleccionada = ciudad;
          this.empresanueva.ciudad = ciudad;
          console.log('Ciudad seleccionada:', this.empresanueva.ciudad);
        } else {
          console.log('No se puede obtener la ciudad');
        }

      },
      error => console.error(error)


    );
  }

  buscarSector(id: number) {
    this.sectorempresarialService.getSectorEmpresarialById(id).subscribe(
      sector => {
        if (sector) {
          this.empresanueva.sectorEmpresarial = sector;
          console.log('Sector seleccionado:', this.empresanueva.sectorEmpresarial);
        } else {
          console.log('No se puede obtener el sector');
        }
      },
      error => console.error(error)
    );
  }
  buscarEmpresas() {
    if (!this.empresariouser) {
      console.error('Error: No hay usuario empresario definido.', this.empresariouser);
      return;
    }

    this.empresaService.getEmpresasbyUser(this.empresariouser).subscribe(
      empresas => {
        // Verificar si el resultado es un array no vacío
        if (Array.isArray(empresas) && empresas.length > 0) {
          this.empresass = empresas;
          console.log('Empresas obtenidas exitosamente:', empresas);
        } else {
          console.error('Error: No se encontraron empresas para el usuario.');
        }
      },
      error => {
        console.error('Error al obtener empresas:', error);
        if (error.status === 400) {
          console.error('Error 400: La solicitud es incorrecta.');
        } else if (error.status === 500) {
          console.error('Error 500: Error interno del servidor.');
        } // Agrega más casos según sea necesario
      }
    );
  }

  getEmpresaById(id: number) {
    this.empresaService.getEmpresaById(id).subscribe(
      empresa => {
        this.empresacargar = empresa;
        console.log('Empresa obtenida exitosamente:', empresa);
      },
      error => console.error('Error al obtener empresa:', error)
    );
  }


  private createEmpresaVacia(): Empresa {
    return {
      id: 0,
      empresario: '',
      ciudad: new Ciudad(),
      sectorempresarial: new sectorempresarial(),
      ruc: '',
      nombre: '',
      tipoEmpresa: '',
      razonSocial: '',
      area: '',
      ubicacion: '',
      sitioweb: ''
    };
  }

}

