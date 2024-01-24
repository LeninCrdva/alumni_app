import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostulacionesAddFormComponent } from './ofertas-laborales/postulaciones-add-form.component';
import { CompanyRoutingModule } from './company-routing.module';

@NgModule({
    declarations: [
        DashboardComponent,
        PostulacionesAddFormComponent
    ],
    imports: [
        CommonModule,
        CompanyRoutingModule,
    ]
})

export class CompanyModule { }
