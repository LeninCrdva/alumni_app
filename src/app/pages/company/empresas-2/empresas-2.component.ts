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

@Component({
  selector: 'app-empresas-2',
  templateUrl: './empresas-2.component.html',
  styleUrl: './empresas-2.component.css'
})
export class Empresas2Component {

  editarClicked = false;
  idEdit: number = 0;
  onEditarClick(id:number|undefined = 0): void {
    this.editarClicked = true;
    this.getEmpresaById(id);
    this.idEdit = id;
  }

  onRegistrarClick(): void {
    this.editarClicked = false;

  }

  //ID del usuario logueado
  idUser: number = parseInt(localStorage.getItem('idUser') || '0', 10);
  //Para obtener el empresario del usuario logueado
  empresariouser: String | undefined= '';
  //Para ciudad y sector empresarial
  ciudadSeleccionada:any={};
  sectorSeleccionado: any= {};
  //Para obtener el empresario del usuario logueado
  empresass: Empresa[] = [];
  empresanueva: any = {};
  empresacargar: any = {};
  ciudades: Ciudad[] = [];
  sectoresEmpresariales: sectorempresarial[] = [];

  ID_Ciudad: number = 0;
  ID_Sector: number = 0;

  @Output() onClose: EventEmitter<string> = new EventEmitter();
  

  constructor(public bsModalRef: BsModalRef, private empresaService: EmpresaService, private ciudadService: CiudadService, private sectorempresarialService: SectorEmpresarialService, private serviceempresario:EmpresarioService) { }

  ngOnInit(): void {
    this.buscarEmpresass();

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
        this.empresariouser = empresario?.usuario;
        console.log('Empresario objeto ultra maximo:', empresario?.usuario);
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
    if (!this.empresanueva.ruc || !this.empresanueva.nombre || !this.empresanueva.tipoEmpresa|| !this.empresanueva.razonSocial|| !this.empresanueva.area|| !this.empresanueva.ubicacion|| !this.empresanueva.sitioWeb||!this.empresanueva.ciudad||!this.empresanueva.sectorEmpresarial) {
      return false;
    }

    return true;
  }
  validateEmpresasPerFieldsEdicion(): boolean {
    if (!this.empresacargar.ruc || !this.empresacargar.nombre || !this.empresacargar.tipoEmpresa|| !this.empresacargar.razonSocial|| !this.empresacargar.area|| !this.empresacargar.ubicacion|| !this.empresacargar.sitioWeb||!this.empresacargar.ciudad||!this.empresacargar.sectorEmpresarial) {
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


  editarEmpresa() {// Add null check before accessing the property
    if (!this.validateEmpresasPerFieldsEdicion()) {
      this.mostrarSweetAlert(false, 'Por favor, completa todos los campos son obligatorios.');
      return;
    }
    this.empresacargar.empresario = this.empresariouser
    console.log('Empresa a editar:', this.empresacargar);
      if (this.empresacargar) { // Add null check before calling the method
        this.empresaService.updateEmpresa(this.idEdit, this.empresacargar).subscribe(
          empresaActualizada => {
            console.log('Empresa actualizada exitosamente:', empresaActualizada);
            this.mostrarSweetAlert(true, 'La empresa se ha actualizado exitosamente.');
            this.empresacargar = this.createEmpresaVacia(); // Limpiar el formulario
          },
          error => {
            console.error('Error al actualizar empresa:', error)
            this.mostrarSweetAlert(false, 'La empresa no se ha actualizado');
          }

        );
      }
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
        if(ciudad){
          console.log('Ciudad:', ciudad);
          //this.ciudadSeleccionada = ciudad;
          this.empresanueva.ciudad = ciudad;
          console.log('Ciudad seleccionada:', this.empresanueva.ciudad);
        }else{
          console.log('No se puede obtener la ciudad');
        }
          
      },
      error => console.error(error)

      
    );
  }
  
  buscarSector(id: number) {
    this.sectorempresarialService.getSectorEmpresarialById(id).subscribe(
      sector => {
        if(sector){
          console.log('Sector:', sector);
          //this.sectorSeleccionado = sector;
          this.empresanueva.sectorEmpresarial = sector;
          console.log('Sector seleccionado:', this.empresanueva.sectorempresarial);
        }else{
          console.log('No se puede obtener el sector');
        }
      },
      
      error => console.error(error)
      
      
    );
  }

  buscarEmpresass(){
    this.empresaService.getEmpresas().subscribe(
      empresas => {
        this.empresass = empresas;
        console.log('Empresas obtenidas exitosamente:', empresas);
      },
      error => console.error('Error al obtener empresas:', error)
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
      empresario: '', // Deberías instanciar las otras clases también aquí si es necesario
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

