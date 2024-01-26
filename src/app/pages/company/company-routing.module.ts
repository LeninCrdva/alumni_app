import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OfertasLaboralesComponent } from './ofertas-laborales/ofertas-laborales.component';
import { CrudEmpresasComponent } from './crud-empresas/crud-empresas.component';
import { Empresas2Component } from './empresas-2/empresas-2.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'postulaciones_form', component: OfertasLaboralesComponent },
    { path: 'empresas', component: CrudEmpresasComponent },
    { path: 'crud', component: Empresas2Component },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CompanyRoutingModule { }