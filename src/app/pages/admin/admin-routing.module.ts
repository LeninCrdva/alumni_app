import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SectorEmpComponent } from './sector-emp/sector-emp.component';
import { GraficasComponent } from './reports/visual_reports/graficas/graficas.component';
import { UsuariosListsComponent } from '../admin/usuarios-lists/usuarios-lists.component';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { DocumentosComponent } from './reports/docs_reports/documentos/documentos.component';
import { EmpresaReportComponent } from './reports/empresa-report/empresa-report.component';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
import { ProvinciaComponent } from './provincia/provincia.component';
import { Ciudad } from '../../data/model/ciudad';
import { PeriodoCarreraComponent } from './periodo-carrera/periodo-carrera.component';
import { CarreraComponent } from './carrera/carrera.component';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { OfertasLaboralesComponent } from './ofertas-laborales/ofertas-laborales.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'perfil-admin', component: PerfilUsuarioComponent },
    { path: 'sector-empresarial', component: SectorEmpComponent },
    { path: 'reportes', component: GraficasComponent },
    { path: 'sector-empresarial', component: SectorEmpComponent },
    { path: 'reportes', component: GraficasComponent },
    { path: 'provincia', component: ProvinciaComponent },
    { path: 'carrera', component: CarreraComponent },
    { path: 'ciudad', component: Ciudad },
    { path: 'periodo', component: PeriodoCarreraComponent },
    { path: 'usuarios-list', component: UsuariosListsComponent },
    { path: 'usuarios-form', component: UsuariosFormComponent },
    { path: 'documentos', component: DocumentosComponent },
    { path: 'empresa-document', component: EmpresaReportComponent },
    { path: 'update-perfil', component: PerfilFormComponent },
    { path: 'encuestas', component: EncuestasComponent },
    { path: 'empresas', component: EmpresasComponent },
    { path: 'ofertas-laborales', component: OfertasLaboralesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }