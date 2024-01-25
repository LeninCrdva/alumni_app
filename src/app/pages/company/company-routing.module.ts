import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OfertasLaboralesComponent } from './ofertas-laborales/ofertas-laborales.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'postulaciones_form', component: OfertasLaboralesComponent },
    { path: 'postulaciones_form', component: OfertasLaboralesComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CompanyRoutingModule { }