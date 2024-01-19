import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumniRoutingModule } from './alumni-routing.module';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    declarations: [
        PerfilUsuarioComponent,
        PerfilUsuarioComponent,
        DashboardComponent
    ],
    imports: [
        CommonModule,
        AlumniRoutingModule,
    ]
})

export class AlumniModule { }
