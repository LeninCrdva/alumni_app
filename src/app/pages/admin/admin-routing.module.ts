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

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'perfil-admin', component: PerfilUsuarioComponent },
    { path: 'sector-empresarial', component: SectorEmpComponent },
    { path: 'reportes', component: GraficasComponent },
    { path: 'usuarios-list', component: UsuariosListsComponent },
    { path: 'usuarios-form', component: UsuariosFormComponent },
    { path: 'documentos', component: DocumentosComponent },
    { path: 'empresa-document', component: EmpresaReportComponent },
    { path: 'update-perfil', component: PerfilFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }