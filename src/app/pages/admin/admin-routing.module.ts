import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { SectorEmpresarialComponent } from './sector-empresarial/sector-empresarial.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'perfil-usuario', component: PerfilUsuarioComponent },
    { path: 'usuarios-form', component: UsuariosFormComponent },
    { path: 'sector-empresarial', component: SectorEmpresarialComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }