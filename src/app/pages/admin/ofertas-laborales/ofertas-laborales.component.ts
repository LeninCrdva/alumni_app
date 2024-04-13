import { Component, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { OfertalaboralService } from '../../../data/service/ofertalaboral.service';
import { DataTableDirective } from 'angular-datatables';
import { FiltersService } from '../../../data/Filters.service';
import { DataTablesService } from '../../../data/DataTables.service';
import { AlertsService } from '../../../data/Alerts.service';
import { ofertaLaboral } from '../../../data/model/ofertaLaboral';
import { ofertaLaboralDTO } from '../../../data/model/DTO/ofertaLaboralDTO';

@Component({
  selector: 'app-ofertas-laborales',
  templateUrl: './ofertas-laborales.component.html',
  styleUrl: './ofertas-laborales.component.css'
})
export class OfertasLaboralesComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  initializeTable: boolean = true;
  dtoptions: DataTables.Settings = {};

  ofertasLaboralesList: ofertaLaboralDTO[] = [];
  ofertaLaboralDTO: ofertaLaboralDTO = new ofertaLaboralDTO();

  idEdit: number = 0;

  editarClicked = false;

  constructor(
    private ofertaService: OfertalaboralService,
    private alertService: AlertsService,
    public dtService: DataTablesService,
    public filterService: FiltersService
  ) { }

  ngOnInit(): void {
    this.loadData();
    const columnTitles = ['#', 'Área de conocimiento', 'Cargo', 'Experiencia', 'Salario', 'Fecha de cierre', 'Fecha de publicación', 'Estado', 'Nombre de la empresa'];
    this.dtoptions = this.dtService.setupDtOptions(columnTitles, 'Buscar ofertas...');
    this.filterService.initializeDropdowns('filterTable', columnTitles,);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
   
  }

  loadData() {
    this.ofertaService.getOfertasLaborales().subscribe(
      (result) => {
        this.ofertasLaboralesList = [];
        this.ofertasLaboralesList = result;
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

  viewOfertaLaboral(id: any) {
    this.ofertaService.getOfertaLaboralByIdToDTO(id).subscribe((result) => {
      this.ofertaLaboralDTO = result;
    });
  }

  fileContent: string | ArrayBuffer | null = null;

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
          await this.ofertaService.createOfertaLaboral(dataToRestore).toPromise();
        }
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
