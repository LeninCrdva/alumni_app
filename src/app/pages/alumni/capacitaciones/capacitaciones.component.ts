import { Component, Renderer2, ViewChild } from '@angular/core';
import { AlertsService } from '../../../data/Alerts.service';
import { DataTablesService } from '../../../data/DataTables.service';
import { FiltersService } from '../../../data/Filters.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Capacitacion } from '../../../data/model/capacitacion';
import { CapacitacionService } from '../../../data/service/capacitacion.service';

@Component({
  selector: 'app-capacitaciones',
  templateUrl: './capacitaciones.component.html',
  styleUrls: ['./capacitaciones.component.css']
})
export class CapacitacionesComponent {

  // =====================================================
  //*               DATA TABLE Y FILTROS
  // =======================================================

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  initializeTable: boolean = true;
  dtoptions: DataTables.Settings = {};

  // =====================================================
  //*                   VALIDACIONES
  // =======================================================

  @ViewChild('myModalClose') modalClose: any;

  @ViewChild('codeModal') codeModal!: any;

  capacitacionList: Capacitacion[] = [];

  idEdit: number = 0;

  editarClicked = false;

  validateForm: FormGroup;

  private renderer!: Renderer2;

  // =====================================================
  //*                   CONSTURCTOR
  // =======================================================

  constructor(
    private fb: FormBuilder,
    private capacitacionesService: CapacitacionService,
    private alertService: AlertsService,
    public dtService: DataTablesService,
    public filterService: FiltersService
  ) {
    this.validateForm = this.fb.group({
      nombre: ['', Validators.required],
      institucion: ['', Validators.required],
      tipoCertificado: ['', Validators.required],
      numHoras: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    });
  }

  // Note: Desuscribirse del evento para evitar fugas de memoria
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // Note: Cargar la tabla con los datos despues de que la vista se haya inicializado
  ngAfterViewInit(): void {
    const columnTitles = ['#', 'Nombre', 'Institución', '# Horas', 'Tipo Certificado', 'Fecha Inicio','Fecha Fin'];
    this.dtoptions = this.dtService.setupDtOptions(columnTitles, 'Buscar referencia...');
    this.filterService.initializeDropdowns(columnTitles, this.dtElement);
    this.loadData();
  }

  loadData() {
    this.capacitacionesService.get().subscribe(
      result => {
        this.capacitacionList = [];
        this.capacitacionList = result;

        this.capacitacionList = result.filter(resultData => resultData.cedula === this.obtenerCedula());

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

  // NOTE: CRUD EVENTS
  onRegistrarClick(): void {
    this.validateForm.reset();

    this.alertService.resetInputsValidations(this.renderer);

    this.editarClicked = false;
  }

  onEditarClick(id: number | undefined = 0): void {
    this.editarClicked = true;

    this.validateForm.reset();

    const dataToEdit = this.capacitacionList.find(item => item.id === id);

    if (dataToEdit) {
      this.validateForm.patchValue({
        nombre: dataToEdit.nombre,
        institucion: dataToEdit.institucion,
        tipoCertificado: dataToEdit.tipoCertificado,
        numHoras: dataToEdit.numHoras,
        fechaInicio: dataToEdit.fechaInicio,
        fechaFin: dataToEdit.fechaFin,
      });
    } else {
      console.error(`Elemento con id ${id} no encontrado en la lista.`);
    }

    this.alertService.resetInputsValidations(this.renderer);
    this.idEdit = id;
  }

  onSubmit() {
    if (this.editarClicked) {
      this.onUpdateClick();
    } else {
      this.createNewData();
    }
  }

  obtenerDatosFormulario(): any {
    return {

      nombre: this.validateForm.value.nombre,
      institucion: this.validateForm.value.institucion,
      tipoCertificado: this.validateForm.value.tipoCertificado,
      numHoras: this.validateForm.value.numHoras,
      fechaInicio: this.validateForm.value.fechaInicio,
      fechaFin: this.validateForm.value.fechaFin
    };
  }

  createNewData() {
    if (this.validateForm.valid) {
      this.alertService.mostrarAlertaCargando('Guardando...');
      this.capacitacionesService.create(this.obtenerDatosFormulario()).subscribe(
        result => {
          this.alertService.detenerAlertaCargando();
          this.alertService.mostrarSweetAlert(true, 'Creado correctamente.', this.modalClose);

          this.loadData();
        },
        error => {
          this.alertService.mostrarSweetAlert(false, 'Error al crear.');
          console.error('Error al crear:', error);
        }
      );
    } else {
      Object.keys(this.validateForm.controls).forEach(controlName => this.validateForm.controls[controlName].markAsTouched());

      this.alertService.showInputsValidations(this.renderer);

      this.alertService.mostrarAlertaSweet();
    }
  }

  onUpdateClick() {
    if (this.validateForm.valid) {
      this.alertService.mostrarAlertaCargando('Actualizando...');
      this.capacitacionesService.update(this.idEdit, this.obtenerDatosFormulario()).subscribe(
        result => {
          this.alertService.detenerAlertaCargando();
          this.alertService.mostrarSweetAlert(true, 'Actualizado correctamente.', this.modalClose);
          this.loadData();
        },
        error => {
          this.alertService.mostrarSweetAlert(false, 'Error al actualizar.');
        }
      );
    } else {
      Object.keys(this.validateForm.controls).forEach(controlName => this.validateForm.controls[controlName].markAsTouched());

      this.alertService.showInputsValidations(this.renderer);
    }
  }

  onDeleteClick(id: number | undefined = 0) {
    this.alertService.mostrarAlertaCargando('Eliminando...');

    this.capacitacionesService.delete(id).subscribe(
      () => {
        this.alertService.detenerAlertaCargando();
        this.alertService.mostrarSweetAlert(true, 'Se ha eliminado correctamente.');

        this.loadData();
      },
      error => {
        this.alertService.mostrarSweetAlert(false, 'Error al eliminar.');
      }
    );
  }

  obtenerCedula(): string {
    const userDataString = localStorage.getItem('user_data');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return userData.persona.cedula;
    }
    return '';
  }

  exportarDatos() {
    this.dtService.generarJSON(this.capacitacionList, 'capacitaciones');
  }

  fileContent: string | ArrayBuffer | null = null;

  onFileSelect(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let file: File | null = element.files ? element.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fileContent = reader.result;
      };
      reader.readAsText(file);
    }
  }

  async importarDatos(): Promise<void> {
    if (!this.fileContent || typeof this.fileContent !== 'string') {
      this.alertService.mostrarSweetAlert(false, 'No hay archivo o formato inválido.');
      return;
    }

    try {
      this.alertService.mostrarAlertaCargando('Importando datos...');
      const data = JSON.parse(this.fileContent);

      if (Array.isArray(data)) {
        for (const dataToRestore of data) {
          await this.capacitacionesService.create(dataToRestore).toPromise();
        }
        this.codeModal.nativeElement.click();
        this.alertService.mostrarSweetAlert(true, 'Todo el contenido fue restaurado con éxito.');
      } else {
        this.alertService.mostrarSweetAlert(false, 'El JSON proporcionado no es un array.');
      }
    } catch (error: any) {
      this.alertService.mostrarSweetAlert(false, 'Error al parsear JSON: ' + error.message);
    } finally {
      this.alertService.detenerAlertaCargando();
    }

    this.loadData();
  }
}