import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { OfertalaboralService } from '../../../data/service/ofertalaboral.service';
import { Empresa } from '../../../data/model/empresa';
import { EmpresaService } from '../../../data/service/empresa.service';
import { error } from 'jquery';
import { ofertaLaboralDTO } from '../../../data/model/DTO/ofertaLaboralDTO';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { Graduado } from '../../../data/model/graduado';
import { GraduadoService } from '../../../data/service/graduado.service';
import { Subject } from 'rxjs';
import { ImageHandlerServiceFoto } from '../../../data/service/ImageHandlerServiceFoto';


@Component({
  selector: 'app-postulaciones-add-form',
  templateUrl: './ofertas-laborales.component.html',
  styleUrls: ['./ofertas-laborales.component.css']
})
export class OfertasLaboralesComponent {
  editarClicked = false;
  idEdit: number = 0;
  onRegistrarClick(): void {
    this.editarClicked = false;
  }

  onEditarClick(id: number | undefined = 0,tipo: string| undefined): void {
    this.editarClicked = true;
    this.getOfertaLaboralById(id);
    this.idEdit = id;
    // Lógica para abrir el modal dependiendo del tipo de oferta
   
    if (tipo) {
      this.selectedStyle=tipo;
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



  ofertaslaborales: any = {};
  ofertaslaboralesCarga: any = {};
  ofertaslaboraleslist: ofertaLaboralDTO[] = [];
  empresas: Empresa[] = [];
  fechaPublicacion: String = '';
  name: string | null = localStorage.getItem('name');
  graduados: Graduado[] = [];
  idOferta: number = 0;
  selectedIDs: (number| undefined)[] = [];
  filtropostulados: number = 1;
  idgraduados: Graduado[] = []
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  public emptrds: string = '';
  selectedStyle: string = "estilo1";
  editarClickedStyle:boolean = false;
  @Output() onClose: EventEmitter<string> = new EventEmitter();
  @ViewChild('myModalClose') modalClose: any;


  constructor(public bsModalRef: BsModalRef
    , private ofertalaburoService: OfertalaboralService,
    public imageHandlerService: ImageHandlerServiceFoto, 
    private empresaService: EmpresaService, private graduadoService: GraduadoService) { 
    }

  ngOnInit(): void {
    this.loadData();
    this.setupDtOptions();
   this.getMisEmpresas();
    //this.getAllOfertasLaborales();
    this.loadCleanObject();
    this.getFechaPublicacion();
    this.ofertaslaborales.estado = false;
    
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
  
  setupDtOptions() {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      lengthChange: true,
      language: {
        search: 'Buscar:',
        searchPlaceholder: 'Buscar trabajo...',
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
    this.ofertalaburoService.OfertasLaborales(this.name||"").subscribe(
      ofertas => {
        console.log('ofertas', ofertas);
        // Filtrar las referencias personales por cédula
        this.ofertaslaboraleslist = ofertas;
        this.dtTrigger.next(null);
      },
      (error: any) => console.error(error)
    );
  }

  getAllOfertasLaborales() {

    this.ofertalaburoService.OfertasLaborales(this.name||"").subscribe(
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
      correoGraduado: [] as string[],

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
      correoGraduado: [] as string[],

    };
  }
  listpostulantes(idoferta: number | undefined) {
    this.ofertalaburoService.getGraduadosByOfertaLaboral(idoferta||0).subscribe(
      graduadoss => {
        this.idOferta = idoferta||0;
        this.graduados = graduadoss;
        console.log('postulantes lista', this.graduados);
        console.log(' lista', idoferta);

        
      }
     
    )
  }

  listContratados(){
    this.graduados = [];
    this.ofertalaburoService.getGraduadosContradatosByOfertaLaboral(this.idOferta).subscribe(
      contratados => {
        this.idgraduados = contratados.map(contratado => contratado.graduados);
        for(const graduado of this.idgraduados){
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
     if (this.selectedStyle === 'estilo1') {
      this.closeModal2('m_modal_4');
    } else if (this.selectedStyle === 'estilo2') {
      this.closeModal2('m_modal_6');
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
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Agrega un cero si el mes es de un solo dígito
    const day = currentDate.getDate().toString().padStart(2, '0'); // Agrega un cero si el día es de un solo dígito
    const year = currentDate.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;

    this.fechaPublicacion = formattedDate;
    if (this.editarClicked == true) {
      this.ofertaslaboralesCarga.fechaPublicacion = new Date(formattedDate);
      console.log('Fecha de publicacion', this.ofertaslaborales.fechaPublicacion);
    } else {
      this.ofertaslaborales.fechaPublicacion = new Date(formattedDate);
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



  getMisEmpresas(): void {
    this.empresaService.getEmpresasbyUser(this.name || "").subscribe((empresas) => {
      for (const empresa of empresas) {
        if (empresa.estado == true) {
          this.empresas.push(empresa);
        }
      }
    });
  }

  setIDGraduado(id: number | undefined = 0){
    localStorage.setItem('idGraduado', id.toString());
  }

  selectedRows: boolean[] = [];

  sendSelectedIDs() {
        this.selectedIDs = this.graduados
          .filter((graduado, index) => this.selectedRows[index])
          .map(graduado => graduado.id);
  
      // Now you have an array of 'number' IDs
      console.log(this.selectedIDs);
      if(this.filtropostulados == 1){
        this.contratarGraduado();
      }else if(this.filtropostulados == 2){
        this.descontratarGraduado();
      }
  }

  contratarGraduado(){
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
  descontratarGraduado(id: number | undefined = 0){
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
    

  filtroPostulados(){
    console.log(this.filtropostulados)

    if(this.filtropostulados == 1){
      this.listpostulantes(this.idOferta);
    }else if(this.filtropostulados == 2){
      this.listContratados();
  }
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
      this.getMisEmpresas();
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
    const file = this.imageHandlerService.archivos[0];
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
        this.ofertaslaborales.foto_portada = base64String;
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
}

updateOfertaLaboral() {
  console.log('Almeja', this.idEdit, this.ofertaslaboralesCarga);
  if (!this.validateOfertasCargaPerFields() && this.selectedStyle === 'estilo1') {
    this.mostrarSweetAlert(false, 'Por favor, completa todos los campos son obligatorios.');
    return;
  }

  const file = this.imageHandlerService.archivos[0];
  if (!file) {
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
  } else {
    // Se ha seleccionado un archivo, se procede a actualizar la foto de portada
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64String = reader.result as string;
      this.ofertaslaboralesCarga.foto_portada = base64String;

     
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
          this.imageHandlerService.previsualizacion = this.ofertaslaboralesCarga.foto_portada;
        }
      },
      error => console.error(error)
    )
  }
}