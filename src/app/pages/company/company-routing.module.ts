import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostulacionesAddFormComponent } from './ofertas-laborales/postulaciones-add-form.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'postulaciones_form', component: PostulacionesAddFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CompanyRoutingModule { }