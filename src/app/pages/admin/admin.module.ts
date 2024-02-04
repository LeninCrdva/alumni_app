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
    GraficasComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgApexchartsModule
    ]
})

export class AdminModule { }
