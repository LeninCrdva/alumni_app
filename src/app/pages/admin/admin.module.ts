import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}

@NgModule({
    declarations: [
    UsuariosFormComponent,
    DashboardComponent,
    UsuariosFormComponent
  ],
    imports: [
        CommonModule,
      AdminRoutingModule,
      LottieModule.forRoot({ player: playerFactory })
    ]
})

export class AdminModule { }
