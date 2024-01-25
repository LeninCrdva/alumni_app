import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyRoutingModule } from './company-routing.module';
import { FormsModule } from '@angular/forms';
import { OfertasLaboralesComponent } from './ofertas-laborales/ofertas-laborales.component';
import { CrudEmpresasComponent } from './crud-empresas/crud-empresas.component';

@NgModule({
    declarations: [
        DashboardComponent,
        OfertasLaboralesComponent,
        CrudEmpresasComponent
    ],
    imports: [
        CommonModule,
        CompanyRoutingModule,
        [FormsModule],
    ]
})

export class CompanyModule { }
