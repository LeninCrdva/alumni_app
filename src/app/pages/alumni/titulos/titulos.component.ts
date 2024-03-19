import { Component, Renderer2, ViewChild } from '@angular/core';
import { AlertsService } from '../../../data/Alerts.service';
import { DataTablesService } from '../../../data/DataTables.service';
import { FiltersService } from '../../../data/Filters.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Titulo } from '../../../data/model/titulo';
import { TituloService } from '../../../data/service/titulo.service';
import { CarreraService } from '../../../data/service/carrera.service';
import { Carrera } from '../../../data/model/carrera';
@Component({
  selector: 'app-titulos',
  templateUrl: './titulos.component.html',
  styleUrls: ['./titulos.component.css']
})
export class TitulosComponent {

  // =====================================================
  //*               DATA TABLE Y FILTROS
  // =======================================================

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  initializeTable: boolean = true;
  dtoptions: DataTables.Settings = {};
  public carrerasList: Carrera[] = [];

  // =====================================================
  //*                   VALIDACIONES
  // =======================================================

  @ViewChild('myModalClose') modalClose: any;

  @ViewChild('codeModal') codeModal!: any;

  titulosList: Titulo[] = [];

  idEdit: number = 0;

  editarClicked = false;

  validateForm: FormGroup;

  private renderer!: Renderer2;

  // =====================================================
  //*                   CONSTURCTOR
  // =======================================================

  constructor(
    private fb: FormBuilder,
    private tituloService: TituloService,
    private alertService: AlertsService,
    private carrerasService: CarreraService,
    public dtService: DataTablesService,
    public filterService: FiltersService
  ) {
    this.validateForm = this.fb.group({
      tipo: ['', Validators.required],
      nivel: ['', Validators.required],
      institucion: ['', Validators.required],
      nombre_titulo: ['', Validators.required],
      fecha_registro: ['', Validators.required],
      fecha_emision: ['', Validators.required],
      num_registro: ['', Validators.required],
      nombrecarrera: ['', Validators.required]
    });
  }

  // Note: Desuscribirse del evento para evitar fugas de memoria
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // Note: Cargar la tabla con los datos despues de que la vista se haya inicializado
  ngAfterViewInit(): void {
    const columnTitles = ['#', 'Título', 'Tipo', 'Nivel', 'Institución', 'Carrera', 'Fecha de Registro', 'Fecha de Emisión', '# de Registro'];
    this.dtoptions = this.dtService.setupDtOptions(columnTitles, 'Buscar titulos...');
    this.filterService.initializeDropdowns(columnTitles, this.dtElement);
    this.loadData();
  }

  loadData() {
    this.tituloService.get().subscribe(
      result => {
        this.titulosList = [];
        this.titulosList = result;

        this.titulosList = result.filter(resultData => resultData.idgraduado === this.obtenerIDGraduado());

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

    const dataToEdit = this.titulosList.find(item => item.id === id);

    if (dataToEdit) {
      this.validateForm.patchValue({
        tipo: dataToEdit.tipo,
        nivel: dataToEdit.nivel,
        institucion: dataToEdit.institucion,
        nombre_titulo: dataToEdit.nombre_titulo,
        fecha_registro: dataToEdit.fecha_registro,
        fecha_emision: dataToEdit.fecha_emision,
        num_registro: dataToEdit.num_registro,
        nombrecarrera: dataToEdit.nombrecarrera
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
      tipo: this.validateForm.value.tipo,
      nivel: this.validateForm.value.nivel,
      institucion: this.validateForm.value.institucion,
      nombre_titulo: this.validateForm.value.nombre_titulo,
      fecha_registro: this.validateForm.value.fecha_registro,
      fecha_emision: this.validateForm.value.fecha_emision,
      num_registro: this.validateForm.value.num_registro,
      nombrecarrera: this.validateForm.value.nombrecarrera,
      idgraduado: this.obtenerIDGraduado()
    };
  }

  createNewData() {
    if (this.validateForm.valid) {
      this.alertService.mostrarAlertaCargando('Guardando...');
      this.tituloService.create(this.obtenerDatosFormulario()).subscribe(
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

      this.alertService.mostrarAlertaSweet();
    }
  }

  onUpdateClick() {
    if (this.validateForm.valid) {
      this.alertService.mostrarAlertaCargando('Actualizando...');
      this.tituloService.update(this.idEdit, this.obtenerDatosFormulario()).subscribe(
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
    this.alertService.mostrarAlertaCargando('Eliminando...');

    this.tituloService.delete(id).subscribe(
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

  obtenerIDGraduado(): number {
    const userDataString = localStorage.getItem('user_data');
    const userData = JSON.parse(userDataString!);

    return userData.persona.id;
  }
  
  obtenerCarreras() {
    this.carrerasService.getCarreras().subscribe(
      carreras => {
        this.carrerasList = carreras;
      },
      (error: any) => console.error(error)
    );
  }

  exportarDatos() {
    this.dtService.generarJSON(this.titulosList, 'titulos');
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
          await this.tituloService.create(dataToRestore).toPromise();
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