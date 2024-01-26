import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
    UsuariosFormComponent,
    DashboardComponent,
    UsuariosFormComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
    ]
})

export class AdminModule { }
