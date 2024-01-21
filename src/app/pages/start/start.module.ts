import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import { LottieModule } from 'ngx-lottie';
import { StartRoutingModule } from './start-routing.module';
import player from 'lottie-web';

// Note: Para las imagenes animadas
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    StartComponent
  ],
  imports: [
    CommonModule,
    StartRoutingModule,
    LottieModule.forRoot({ player: playerFactory })
  ]
})

export class StartModule { }
