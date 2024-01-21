import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import { StartRoutingModule } from './start-routing.module';
import { LottieModule } from 'ngx-lottie';
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
    LottieModule.forRoot({ player: playerFactory }),
    CommonModule,
    StartRoutingModule,
  ]
})

export class StartModule { }
