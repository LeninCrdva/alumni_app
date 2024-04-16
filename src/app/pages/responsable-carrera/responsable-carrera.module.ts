import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsableCarreraRoutingModule } from './responsable-carrera-routing.module';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RespuestasComponent } from './respuestas/respuestas.component';


@NgModule({
  declarations: [
    EncuestasComponent,
    DashboardComponent,
    RespuestasComponent,
    
  ],
  imports: [
    CommonModule,
    ResponsableCarreraRoutingModule,
    ReactiveFormsModule
  ]
})
export class ResponsableCarreraModule { }
