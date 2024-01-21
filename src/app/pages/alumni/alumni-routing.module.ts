import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostulacionesComponent } from './postulaciones/postulaciones.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ParametrosPreguntasComponent } from './parametros-preguntas/parametros-preguntas.component';
import { StateListComponent } from './state-list/state-list.component';
import { SectorEmpresarialCrudComponent } from './sector-empresarial-crud/sector-empresarial-crud.component';
import { CarrerasCrudComponent } from './carreras-crud/carreras-crud.component';
import { OfertaDetalleComponent } from './oferta-detalle/oferta-detalle.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'postulaciones', component: PostulacionesComponent },
    { path: 'parametros-preguntas', component: ParametrosPreguntasComponent },
    { path: 'estados', component: StateListComponent },
    { path: 'carrera', component: CarrerasCrudComponent },
    { path: 'sector-empresarial', component: SectorEmpresarialCrudComponent },
    { path: 'oferta-detalle', component: OfertaDetalleComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AlumniRoutingModule { }