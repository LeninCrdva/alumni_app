import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumniRoutingModule } from './company-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostulacionesComponent } from '../alumni/postulaciones/postulaciones.component';

@NgModule({
    declarations: [
        DashboardComponent,
        PostulacionesComponent
    ],
    imports: [
        CommonModule,
        AlumniRoutingModule,
    ]
})

export class AlumniModule { }
