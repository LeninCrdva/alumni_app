import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumniRoutingModule } from './alumni-routing.module';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

@NgModule({
    declarations: [
        PerfilUsuarioComponent
    ],
    imports: [
        CommonModule,
        AlumniRoutingModule,
        UsuarioFormComponent,
        PerfilUsuarioComponent,
    ]
})

export class HomeModule { }
