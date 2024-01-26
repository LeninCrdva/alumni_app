import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { SectorEmpComponent } from './sector-emp/sector-emp.component';

@NgModule({
    declarations: [
    DashboardComponent,
    SectorEmpComponent,
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
    ]
})

export class AdminModule { }
