import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SectorEmpComponent } from './sector-emp/sector-emp.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'perfil-usuario', component: PerfilUsuarioComponent },
    { path: 'sector-empresarial', component: SectorEmpComponent},
    { path: 'reportes', component: SectorEmpComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }