import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SectorEmpComponent } from './sector-emp/sector-emp.component';
import { NuevoAdministradorModalComponent } from './nuevo-administrador-modal/nuevo-administrador-modal.component';
import { UsuariosListsComponent } from './usuarios-lists/usuarios-lists.component';

@NgModule({
    declarations: [
    DashboardComponent,
    SectorEmpComponent,
    NuevoAdministradorModalComponent,
    UsuariosListsComponent,
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class AdminModule { }
