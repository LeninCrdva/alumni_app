import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyRoutingModule } from './company-routing.module';
import { FormsModule } from '@angular/forms';
import { OfertasLaboralesComponent } from './ofertas-laborales/ofertas-laborales.component';
import { CrudEmpresasComponent } from './crud-empresas/crud-empresas.component';
import { Empresas2Component } from './empresas-2/empresas-2.component';
import { NuevoEmpresarioModalComponent } from './nuevo-empresario-modal/nuevo-empresario-modal.component';

@NgModule({
    declarations: [
        DashboardComponent,
        OfertasLaboralesComponent,
        CrudEmpresasComponent,
        Empresas2Component,
       // NuevoEmpresarioModalComponent
    ],
    imports: [
        CommonModule,
        CompanyRoutingModule,
        [FormsModule],
    ]
})

export class CompanyModule { }
