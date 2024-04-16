import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { RespuestasComponent } from './respuestas/respuestas.component';
import { EncuestaDetalleModalComponent } from './encuesta-detalle-modal/encuesta-detalle-modal.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'encuestas', component: EncuestasComponent },
  { path: 'detalle', component: EncuestaDetalleModalComponent },
  { path: 'respuestas', component: RespuestasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponsableCarreraRoutingModule { }
