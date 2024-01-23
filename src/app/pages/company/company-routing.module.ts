import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostulacionesComponent } from '../alumni/postulaciones/postulaciones.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'add_postulaciones_form', component: PostulacionesComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AlumniRoutingModule { }