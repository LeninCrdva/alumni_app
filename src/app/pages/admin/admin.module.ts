import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { GraficasComponent } from './reports/visual_reports/graficas/graficas.component';
import { DocumentosComponent } from './reports/docs_reports/documentos/documentos.component';

@NgModule({
    declarations: [
    DashboardComponent,
    GraficasComponent,
    DocumentosComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule
    ]
})

export class AdminModule { }
