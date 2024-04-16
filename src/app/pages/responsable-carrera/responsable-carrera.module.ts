import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsableCarreraRoutingModule } from './responsable-carrera-routing.module';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RespuestasComponent } from './respuestas/respuestas.component';
import { EncuestaDetalleModalComponent } from './encuesta-detalle-modal/encuesta-detalle-modal.component';


@NgModule({
  declarations: [
    EncuestasComponent,
    DashboardComponent,
    RespuestasComponent,
    EncuestaDetalleModalComponent
  ],
  imports: [
    CommonModule,
    ResponsableCarreraRoutingModule,
    ReactiveFormsModule,
    FormsModule,    
  ]
})
export class ResponsableCarreraModule { }
