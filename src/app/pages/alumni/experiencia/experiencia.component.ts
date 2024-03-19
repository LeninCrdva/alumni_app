import { Component, Renderer2, ViewChild } from '@angular/core';
import { Experiencia } from '../../../data/model/experiencia';
import { ExperienciaService } from '../../../data/service/experiencia.service';
import { AlertsService } from '../../../data/Alerts.service';
import { DataTablesService } from '../../../data/DataTables.service';
import { FiltersService } from '../../../data/Filters.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent {
  
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

  experienciaList: Experiencia[] = [];

  idEdit: number = 0;

  editarClicked = false;

  validateForm: FormGroup;

  // =====================================================
  //*                   CONSTURCTOR
  // =======================================================

  constructor(
    private fb: FormBuilder,
    private experienciaService: ExperienciaService,
    private alertService: AlertsService,
    public dtService: DataTablesService,
    public filterService: FiltersService,
    private renderer: Renderer2
  ) {
    this.validateForm = this.fb.group({
      cargo: ['', Validators.required],
      duracion: ['', Validators.required],
      area_trabajo: ['', Validators.required],
      institucionNombre: ['', Validators.required],
      actividad: ['', Validators.required],
    });
  }

  // Note: Desuscribirse del evento para evitar fugas de memoria
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // Note: Cargar la tabla con los datos despues de que la vista se haya inicializado
  ngAfterViewInit(): void {
    const columnTitles = ['#', 'Cargo', 'Duración', 'Institucion', 'Actividad', 'Area de trabajo'];
    this.dtoptions = this.dtService.setupDtOptions(columnTitles, 'Buscar experiencia...');
    this.filterService.initializeDropdowns(columnTitles, this.dtElement);
    this.loadData();
  }

  loadData() {
    this.experienciaService.get().subscribe(
      result => {
        this.experienciaList = [];
        this.experienciaList = result;

        this.experienciaList = result.filter(resultData => resultData.cedulaGraduado === this.obtenerCedula());

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

    const dataToEdit = this.experienciaList.find(item => item.id === id);

    if (dataToEdit) {
      this.validateForm.patchValue({
        cargo: dataToEdit.cargo,
        duracion: dataToEdit.duracion,
        area_trabajo: dataToEdit.area_trabajo,
        institucionNombre: dataToEdit.institucionNombre,
        actividad: dataToEdit.actividad,
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
      cargo: this.validateForm.value['cargo'],
      duracion: this.validateForm.value['duracion'],
      area_trabajo: this.validateForm.value['area_trabajo'],
      institucionNombre: this.validateForm.value['institucionNombre'],
      actividad: this.validateForm.value['actividad'],
      cedulaGraduado: this.obtenerCedula()
    };
  }
  
  createNewData() {
    if (this.validateForm.valid) {
      this.alertService.mostrarAlertaCargando('Guardando...');
      this.experienciaService.create(this.obtenerDatosFormulario()).subscribe(
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
      
      this.alertService.showInputsValidations(this.renderer);
    }
  }

  onUpdateClick() {
    if (this.validateForm.valid) {
      this.alertService.mostrarAlertaCargando('Actualizando...');
      this.experienciaService.update(this.idEdit, this.obtenerDatosFormulario()).subscribe(
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
      
      this.alertService.showInputsValidations(this.renderer);
    }
  }

  onDeleteClick(id: number | undefined = 0) {
    this.alertService.mostrarAlertaCargando('Eliminando la experiencia seleccionada...');

    this.experienciaService.delete(id).subscribe(
      () => {
        this.alertService.detenerAlertaCargando();
        this.alertService.mostrarSweetAlert(true, 'La experiencia se ha eliminado correctamente.');

        this.loadData();
      },
      error => {
        this.alertService.mostrarSweetAlert(false, 'Error al eliminar la experiencia.');
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
    this.dtService.generarJSON(this.experienciaList, 'experiencia');
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
          await this.experienciaService.create(dataToRestore).toPromise();
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