import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsableCarreraRoutingModule } from './responsable-carrera-routing.module';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    EncuestasComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ResponsableCarreraRoutingModule
  ]
})
export class ResponsableCarreraModule { }
