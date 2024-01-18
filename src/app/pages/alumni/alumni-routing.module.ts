import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { PostulacionesComponent } from './postulaciones/postulaciones.component';

const routes: Routes = [
    { path: 'perfil-usuario', component: PerfilUsuarioComponent },
    { path: 'postulaciones', component: PostulacionesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AlumniRoutingModule { }