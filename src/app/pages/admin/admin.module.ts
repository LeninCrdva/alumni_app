import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SectorEmpComponent } from './sector-emp/sector-emp.component';
import { NuevoAdministradorModalComponent } from './nuevo-administrador-modal/nuevo-administrador-modal.component';
import { UsuariosListsComponent } from './usuarios-lists/usuarios-lists.component';
import { DocumentosComponent } from './reports/docs_reports/documentos/documentos.component';
import { EmpresaReportComponent } from './reports/empresa-report/empresa-report.component';
import { AreaChartComponent } from './reports/visual_reports/graficas/area-chart/area-chart.component';
import { PieChartComponent } from './reports/visual_reports/graficas/pie-chart/pie-chart.component';
import { GraficasComponent } from './reports/visual_reports/graficas/graficas.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import ApexCharts from 'apexcharts';
import { ProvinciaComponent } from './provincia/provincia.component';
import { PeriodoCarreraComponent } from './periodo-carrera/periodo-carrera.component';
import { CarreraComponent } from './carrera/carrera.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BarChartComponent } from './reports/visual_reports/graficas/bar-chart/bar-chart.component';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
import { PieChart2Component } from './reports/visual_reports/graficas/pie-chart2/pie-chart2.component';
@NgModule({
  declarations: [
    DashboardComponent,
    SectorEmpComponent,
    NuevoAdministradorModalComponent,
    UsuariosListsComponent,
    EmpresaReportComponent,
    AreaChartComponent,
    PieChartComponent,
    DocumentosComponent,
    GraficasComponent,
    ProvinciaComponent,
    PeriodoCarreraComponent,
    CarreraComponent,
    BarChartComponent,
    PerfilFormComponent,
    EncuestasComponent,
    PieChart2Component
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})

export class AdminModule { }
