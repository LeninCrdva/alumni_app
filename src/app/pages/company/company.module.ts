import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanyRoutingModule } from './company-routing.module';
import { FormsModule } from '@angular/forms';
import { OfertasLaboralesComponent } from './ofertas-laborales/ofertas-laborales.component';

@NgModule({
    declarations: [
        DashboardComponent,
        OfertasLaboralesComponent
    ],
    imports: [
        CommonModule,
        CompanyRoutingModule,
        [FormsModule],
    ]
})

export class CompanyModule { }
