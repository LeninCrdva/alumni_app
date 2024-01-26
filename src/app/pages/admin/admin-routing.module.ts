import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SectorEmpComponent } from './sector-emp/sector-emp.component';
import { GraficasComponent } from './reports/visual_reports/graficas/graficas.component';
import { UsuariosListsComponent } from '../admin/usuarios-lists/usuarios-lists.component';
//import { PycListComponent } from '../admin/pyc-list/pyc-list.component';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { ParametrosPreguntasComponent } from '../alumni/parametros-preguntas/parametros-preguntas.component';
const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'perfil-usuario', component: PerfilUsuarioComponent },
    { path: 'sector-empresarial', component: SectorEmpComponent},
    { path: 'reportes', component: GraficasComponent},
    { path: 'usuarios-list', component: UsuariosListsComponent },
    { path: 'usuarios-form', component: UsuariosFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }