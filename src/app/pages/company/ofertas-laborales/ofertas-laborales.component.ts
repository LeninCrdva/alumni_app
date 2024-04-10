import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { OfertalaboralService } from '../../../data/service/ofertalaboral.service';
import { Empresa } from '../../../data/model/empresa';
import { EmpresaService } from '../../../data/service/empresa.service';
import { ofertaLaboralDTO } from '../../../data/model/DTO/ofertaLaboralDTO';
import Swal from 'sweetalert2';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Graduado } from '../../../data/model/graduado';
import { GraduadoService } from '../../../data/service/graduado.service';
import { Subject } from 'rxjs';
import { ImageHandlerServiceFoto } from '../../../data/service/ImageHandlerServiceFoto';
import { NgModel } from '@angular/forms';
import { DataTablesService } from '../../../data/DataTables.service';
import { DataTableDirective } from 'angular-datatables';
import { FiltersService } from '../../../data/Filters.service';

@Component({
  selector: 'app-postulaciones-add-form',
  templateUrl: './ofertas-laborales.component.html',
  styleUrls: ['./ofertas-laborales.component.css']
})
export class OfertasLaboralesComponent {
  editarClicked = false;
  idEdit: number = 0;
  enlaceHabilitado: boolean = true;
  ofertaslaborales: any = {};
  ofertaslaboralesCarga: any = {};
  ofertaslaboraleslist: ofertaLaboralDTO[] = [];
  empresas: Empresa[] = [];
  fechaPublicacion?: Date;
  name: string | null = localStorage.getItem('name');
  graduados: Graduado[] = [];
  idOferta: number = 0;
  selectedIDs: (number | undefined)[] = [];
  filtropostulados: number = 1;
  idgraduados: Graduado[] = []
  public emptrds: string = '';
  selectedStyle: string = "estilo1";
  editarClickedStyle: boolean = false;
  @Output() onClose: EventEmitter<string> = new EventEmitter();
  @ViewChild('myModalClose') modalClose: any;

  // =====================================================
  //*               DATA TABLE Y FILTROS
  // =======================================================

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  initializeTable: boolean = true;
  dtoptions: DataTables.Settings = {};

  constructor(
    public bsModalRef: BsModalRef,
    private ofertalaburoService: OfertalaboralService,
    public dtService: DataTablesService,
    public imageHandlerService: ImageHandlerServiceFoto,
    private empresaService: EmpresaService,
    public filterService: FiltersService,
    private graduadoService: GraduadoService
  ) {
  }

  ngOnInit(): void {
    const columnTitles = ['#', 'Fecha Cierre', 'Institucion', 'Estado', 'Estilo'];
    this.dtoptions = this.dtService.setupDtOptions(columnTitles, 'Buscar experiencia...');
    // Para inicializar los dropdowns de los filtros de la tabla.
    this.filterService.initializeDropdowns('filterTable', columnTitles,);
    this.loadData();
    this.getMisEmpresas();
    //this.getAllOfertasLaborales();
    this.loadCleanObject();
    this.ofertaslaborales.estado = false;
  }

  ngAfterViewInit(): void {
    this.filterService.setDtElement(this.dtElement);
  }

  /*
  ngOnInit(): void {
    this.getMisEmpresas();
    //this.getAllOfertasLaborales();
    this.loadCleanObject();
    this.getFechaPublicacion();
    this.ofertaslaborales.estado = false;
  } 
  */

  changeStyle() {
    if (this.selectedStyle === 'estilo1') {
      ($('#m_modal_4') as any).modal('show');
      ($('#m_modal_6') as any).modal('hide');
    } else if (this.selectedStyle === 'estilo2') {
      ($('#m_modal_4') as any).modal('hide');
      ($('#m_modal_6') as any).modal('show');
    }
  }

  loadData() {
    this.ofertalaburoService.OfertasLaborales(this.name || "").subscribe(
      ofertas => {
        this.ofertaslaboraleslist = [];
        // Filtrar las referencias personales por cédula
        this.ofertaslaboraleslist = ofertas;

        if (this.initializeTable) {
          this.dtTrigger.next(null);
          this.initializeTable = false;
        } else {
          this.dtService.rerender(this.dtElement, this.dtTrigger);
        }
      },
      (error: any) => console.error(error)
    );
  }

  getAllOfertasLaborales() {
    this.ofertalaburoService.OfertasLaborales(this.name || "").subscribe(
      ofertas => this.ofertaslaboraleslist = ofertas,
      error => console.error(error)
    )
  }

  loadCleanObject(): void {
    this.ofertaslaborales = {
      id: 0,
      salario: 0,
      fechaCierre: '',
      fechaPublicacion: '',
      cargo: '',
      experiencia: '',
      fechaApertura: '',
      areaConocimiento: '',
      estado: false,
      nombreEmpresa: '',
      tiempo: '',
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
      estado: false,
      nombreEmpresa: '',
      tiempo: '',
    };
  }

  onRegistrarClick(): void {
    this.getFechaPublicacion();
    this.editarClicked = false;
  }

  listpostulantes(idoferta: number | undefined) {
    this.ofertalaburoService.getGraduadosByOfertaLaboral(idoferta || 0).subscribe(
      graduadoss => {
        this.idOferta = idoferta || 0;
        this.graduados = graduadoss;
        console.log('postulantes lista', this.graduados);
        console.log(' lista', idoferta);
      }
    )
  }

  listContratados() {
    this.graduados = [];
    this.ofertalaburoService.getGraduadosContradatosByOfertaLaboral(this.idOferta).subscribe(
      contratados => {
        this.idgraduados = contratados.map(contratado => contratado.graduados);
        for (const graduado of this.idgraduados) {
          this.graduadoService.getGraduadoById(graduado).subscribe(
            graduado => {
              this.graduados.push(graduado);
              console.log('contratados lista', this.graduados);
            }
          );
        }
      }
    );
  }

  onEditarClick(id: number | undefined = 0, tipo: string | undefined): void {
    this.editarClicked = true;
    this.getOfertaLaboralById(id);
    this.idEdit = id;
    // Lógica para abrir el modal dependiendo del tipo de oferta
    this.enlaceHabilitado = true;
    if (tipo) {
      this.selectedStyle = tipo;
      if (tipo === 'estilo1') {
        ($('#m_modal_4') as any).modal('show');
        ($('#m_modal_6') as any).modal('hide');
      } else if (tipo === 'estilo2') {
        ($('#m_modal_4') as any).modal('hide');
        ($('#m_modal_6') as any).modal('show');
      }
    } else {
      console.error('Oferta no encontrada');
    }
  }

  habilitarEnlace(): void {
    this.enlaceHabilitado = true;
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
        this.resetModalState();
      }
    });
    if (this.selectedStyle === 'estilo1') {
      this.closeModal2('m_modal_4');
      this.resetModalState();
    } else if (this.selectedStyle === 'estilo2') {
      this.closeModal2('m_modal_6');
      this.resetModalState();
    }
  }

  validateOfertasPerFields(): boolean {
    if (!this.ofertaslaborales.salario || !this.ofertaslaborales.fechaCierre || !this.ofertaslaborales.cargo || !this.ofertaslaborales.experiencia || !this.ofertaslaborales.fechaApertura || !this.ofertaslaborales.areaConocimiento || !this.ofertaslaborales.nombreEmpresa) {
      return false;
    }

    return true;
  }

  validateOfertasCargaPerFields(): boolean {
    if (!this.ofertaslaboralesCarga.salario || !this.ofertaslaboralesCarga.fechaCierre || !this.ofertaslaboralesCarga.cargo || !this.ofertaslaboralesCarga.experiencia || !this.ofertaslaboralesCarga.fechaApertura || !this.ofertaslaboralesCarga.areaConocimiento || !this.ofertaslaboralesCarga.nombreEmpresa) {
      return false;
    }

    return true;
  }

  getFechaPublicacion() {
    const currentDate = new Date();

    // Obtener componentes de la fecha y hora
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    // Formatear la fecha y hora en el formato requerido
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    // Asignar la fecha formateada a this.fechaPublicacion
    this.fechaPublicacion = currentDate;

    // Asignar la fecha formateada al objeto this.ofertaslaboralesCarga.fechaPublicacion
    if (this.editarClicked) {
      this.ofertaslaboralesCarga.fechaPublicacion = formattedDate;
    } else {
      this.ofertaslaborales.fechaPublicacion = formattedDate;
    }
  }

  getMisEmpresas(): void {
    this.empresaService.getEmpresasbyUser(this.name || "").subscribe((empresas) => {
      for (const empresa of empresas) {
        if (empresa.estado == true) {
          this.empresas.push(empresa);
        }
      }
    });
  }

  setIDGraduado(id: number | undefined = 0) {
    localStorage.setItem('idGraduado', id.toString());
  }

  selectedRows: boolean[] = [];

  sendSelectedIDs() {
    this.selectedIDs = this.graduados
      .filter((graduado, index) => this.selectedRows[index])
      .map(graduado => graduado.id);

    // Now you have an array of 'number' IDs
    console.log(this.selectedIDs);
    if (this.filtropostulados == 1) {
      this.contratarGraduado();
    } else if (this.filtropostulados == 2) {
      this.descontratarGraduado();
    }
  }

  contratarGraduado() {
    this.ofertalaburoService.selectContratados(this.idOferta, this.selectedIDs).subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí
        console.log('Respuesta exitosa:', response);
        // Puedes realizar otras operaciones con la respuesta si es necesario
      },
      (error) => {
        // Manejar el error aquí
        console.error('Error en la solicitud:', error);
        // Puedes realizar otras operaciones para manejar el error si es necesario
      }
    );
  }

  descontratarGraduado(id: number | undefined = 0) {
    this.ofertalaburoService.deleteGraduadoContratado(id).subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí
        console.log('Respuesta exitosa:', response);
        // Puedes realizar otras operaciones con la respuesta si es necesario
      },
      (error) => {
        // Manejar el error aquí
        console.error('Error en la solicitud:', error);
        // Puedes realizar otras operaciones para manejar el error si es necesario
      }
    );
  }

  filtroPostulados() {
    console.log(this.filtropostulados)

    if (this.filtropostulados == 1) {
      this.listpostulantes(this.idOferta);
    } else if (this.filtropostulados == 2) {
      this.listContratados();
    }
  }

  resetSelectedStyle() {
    this.selectedStyle = 'estilo1';
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
            this.closeModal();
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

  closeModal() {
    const cancelButton = document.getElementById('close-button') as HTMLElement;
    if (cancelButton) {
      cancelButton.click();
      this.loadCleanObject();
      this.getAllOfertasLaborales();

      this.editarClicked = false;

    }
  }
  
  closeModal2(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
      if (modalBackdrop) {
        modalBackdrop.parentNode?.removeChild(modalBackdrop);

      }
    }
  }

  createOfertaLaboral() {
    if (!this.validateOfertasPerFields() && this.selectedStyle === 'estilo1') {
      this.mostrarSweetAlert(false, 'Por favor, completa todos los campos, son obligatorios.');
      return;
    }

    this.ofertaslaborales.tipo = this.selectedStyle;
    if (this.selectedStyle === 'estilo2' && (!this.imageHandlerService.archivos || this.imageHandlerService.archivos.length === 0)) {
      this.mostrarSweetAlert(false, 'Por favor, sube una foto de portada.');
      return;
    }

    if (this.selectedStyle === 'estilo2' && this.imageHandlerService.archivos && this.imageHandlerService.archivos.length > 0) {
      const file = this.imageHandlerService.archivos[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64String = reader.result as string;
        this.ofertaslaborales.fotoPortada = base64String;
        console.log("Lo que manda:", this.ofertaslaborales);
        this.createOfertaLaboralRequest();
      };

      reader.onerror = (error) => {
        console.error(error);
        this.mostrarSweetAlert(false, 'Error al cargar la foto de portada.');
      };
    } else {

      this.createOfertaLaboralRequest();
    }
  }

  createOfertaLaboralRequest() {
    if (this.validarCampos()) {
      this.ofertalaburoService.createOfertaLaboral(this.ofertaslaborales).subscribe(
        (response) => {
          this.emptrds = this.ofertaslaborales.empresa;
          console.log(response);
          this.ofertaslaborales = response;
          this.mostrarSweetAlert(true, 'La oferta laboral se ha creado exitosamente.');
          this.closeModal();
        },
        (error) => {
          console.error(error);
          this.mostrarSweetAlert(false, 'La oferta laboral no se ha creado.');
          this.bsModalRef.hide();
        }
      );
    } else {

      Swal.fire({
        icon: 'error',
        title: '¡Upps!',
        text: 'Hay campos que debe corregir para poder completar la acción.',
      });
    }
  }

  resetModalState() {
    this.editarClicked = false;
  }

  updateOfertaLaboral() {
    console.log('Almeja', this.idEdit, this.ofertaslaboralesCarga);
    if (!this.validateOfertasCargaPerFields() && this.selectedStyle === 'estilo1') {
      this.mostrarSweetAlert(false, 'Por favor, completa todos los campos son obligatorios.');
      return;
    }

    const file = this.imageHandlerService.archivos[0];
    if (!file) {
      if (this.validarCampos()) {
        this.ofertalaburoService.updateOfertaLaboral(this.idEdit, this.ofertaslaboralesCarga).subscribe(
          (response) => {
            console.log(response);
            this.ofertaslaborales = response;
            this.mostrarSweetAlert(true, 'La oferta laboral se ha actualizado exitosamente.');
            this.editarClicked = false;

            this.closeModal();
          },
          (error) => {
            console.error(error);
            this.mostrarSweetAlert(false, 'La Oferta Laboral no se ha podido actualizar.');
            this.closeModal();
          }
        );
      } else {

        Swal.fire({
          icon: 'error',
          title: '¡Upps!',
          text: 'Hay campos que debe corregir para poder completar la acción.',
        });
      }
    } else {
      // Se ha seleccionado un archivo, se procede a actualizar la foto de portada
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64String = reader.result as string;
        this.ofertaslaboralesCarga.fotoPortada = base64String;


        this.ofertalaburoService.updateOfertaLaboral(this.idEdit, this.ofertaslaboralesCarga).subscribe(
          (response) => {
            console.log(response);
            this.ofertaslaborales = response;
            this.mostrarSweetAlert(true, 'La oferta laboral se ha actualizado exitosamente.');
            this.closeModal();
          },
          (error) => {
            console.error(error);
            this.mostrarSweetAlert(false, 'La Oferta Laboral no se ha podido actualizar.');
            this.closeModal();
          }
        );
      };

      reader.onerror = (error) => {
        console.error(error);
        this.mostrarSweetAlert(false, 'Error al cargar la foto de portada.');
      };
    }
  }

  getOfertaLaboralById(id: number) {
    this.ofertalaburoService.getOfertaLaboralByIdToDTO(id).subscribe(
      ofertas => {
        this.ofertaslaboralesCarga = ofertas;
        if (this.editarClicked) {
          this.imageHandlerService.previsualizacion = this.ofertaslaboralesCarga.fotoPortada;
        }
      },
      error => console.error(error)
    )
  }
  @ViewChild('estiloInput', { read: NgModel }) estiloInput!: NgModel;
  @ViewChild('cargoInput', { read: NgModel }) cargoInput!: NgModel;
  @ViewChild('nombreempresaInput', { read: NgModel }) nombreempresaInput!: NgModel;
  @ViewChild('tiempoInput', { read: NgModel }) tiempoInput!: NgModel;
  @ViewChild('fechacierreInput', { read: NgModel }) fechacierreInput!: NgModel;
  @ViewChild('fechaaperturaInput', { read: NgModel }) fechaaperturaInput!: NgModel;
  @ViewChild('areaInput', { read: NgModel }) areaInput!: NgModel;
  @ViewChild('salarioInput', { read: NgModel }) salarioInput!: NgModel;
  @ViewChild('experienciaInput', { read: NgModel }) experienciaInput!: NgModel;
  //Estilo2
  @ViewChild('cargo2Input', { read: NgModel }) cargo2Input!: NgModel;
  @ViewChild('area2Input', { read: NgModel }) area2Input!: NgModel;
  @ViewChild('fechacierre2Input', { read: NgModel }) fechacierre2Input!: NgModel;
  
  validarCampos(): boolean {
    const isEstiloValido =
      !(
        this.estiloInput?.invalid &&
        (this.estiloInput?.dirty || this.estiloInput?.touched)
      );


    //console.log("Estilo válido?", isEstiloValido ? "Sí" : "No");

    if (this.selectedStyle === 'estilo1') {
      const isCargoValido =
        !(
          this.cargoInput?.invalid &&
          (this.cargoInput?.dirty || this.cargoInput?.touched)
        );

      //console.log("Cargo válido?", isCargoValido ? "Sí" : "No");

      const isNombreEmpresaValido =
        !(
          this.nombreempresaInput?.invalid &&
          (this.nombreempresaInput?.dirty || this.nombreempresaInput?.touched)
        );

      //console.log("¿Nombre de Empresa válido?", isNombreEmpresaValido ? "Sí" : "No");

      const isTiempoValido =
        !(
          this.tiempoInput?.invalid &&
          (this.tiempoInput?.dirty || this.tiempoInput?.touched)
        );

      //console.log("¿Tiempo válido?", isTiempoValido ? "Sí" : "No");

      const isFechaCierreValida =
        !(
          this.fechacierreInput?.invalid &&
          (this.fechacierreInput?.dirty || this.fechacierreInput?.touched)
        );

      //console.log("¿Fecha de Cierre válida?", isFechaCierreValida ? "Sí" : "No");

      const isFechaAperturaValida =
        !(
          this.fechaaperturaInput?.invalid &&
          (this.fechaaperturaInput?.dirty || this.fechaaperturaInput?.touched)
        );

      //console.log("¿Fecha de Apertura válida?", isFechaAperturaValida ? "Sí" : "No");

      const isAreaValida =
        !(
          this.areaInput?.invalid &&
          (this.areaInput?.dirty || this.areaInput?.touched)
        );

      //console.log("¿Área válida?", isAreaValida ? "Sí" : "No");

      const isSalarioValido =
        !(
          this.salarioInput?.invalid &&
          (this.salarioInput?.dirty || this.salarioInput?.touched)
        );

      //console.log("¿Salario válido?", isSalarioValido ? "Sí" : "No");

      const isExperienciaValida =
        !(
          this.experienciaInput?.invalid &&
          (this.experienciaInput?.dirty || this.experienciaInput?.touched)
        );

      //console.log("¿Experiencia válida?", isExperienciaValida ? "Sí" : "No");

      const isValid = isEstiloValido && isCargoValido && isNombreEmpresaValido && isTiempoValido && isFechaCierreValida && isFechaAperturaValida && isAreaValida && isSalarioValido && isExperienciaValida;

      //console.log("¿Campos válidos?", isValid ? "Sí" : "No");

      return isValid;
    }
    if (this.selectedStyle === 'estilo2') {
      const isCargo2Valido =
        !(
          this.cargo2Input?.invalid &&
          (this.cargo2Input?.dirty || this.cargo2Input?.touched)
        );

      //console.log("Cargo 2 válido?", isCargo2Valido ? "Sí" : "No");

      const isArea2Valida =
        !(
          this.area2Input?.invalid &&
          (this.area2Input?.dirty || this.area2Input?.touched)
        );

      //console.log("¿Área 2 válida?", isArea2Valida ? "Sí" : "No");

      const isFechaCierreValida =
        !(
          this.fechacierre2Input?.invalid &&
          (this.fechacierre2Input?.dirty || this.fechacierre2Input?.touched)
        );

      //console.log("¿Fecha de Cierre válida2?", isFechaCierreValida ? "Sí" : "No");


      const isValid = isEstiloValido && isCargo2Valido && isArea2Valida && isFechaCierreValida
      //console.log("¿Campos válidos?", isValid ? "Sí" : "No");

      return isValid;
    }

    console.error('Estilo no reconocido:', this.selectedStyle);
    return false;
  }
}