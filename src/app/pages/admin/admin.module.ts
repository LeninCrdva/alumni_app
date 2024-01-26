import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
    DashboardComponent,
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
    ]
})

export class AdminModule { }
