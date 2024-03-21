import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import { FormsModule } from '@angular/forms';
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
    CommonModule,
    FormsModule,
    StartRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
  ]
})

export class StartModule { }
