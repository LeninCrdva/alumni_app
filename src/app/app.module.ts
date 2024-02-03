import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { LayoutBaseComponent } from './layout/layout-client/layout-base.component';
import { LayoutSystemComponent } from './layout/layout-system/layout-system.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CommonModule } from '@angular/common';
import {PerfilUsuarioComponent} from '../app/pages/company/perfil-usuario/perfil-usuario.component';
import {NuevoEmpresarioModalComponent} from '../app/pages/company/nuevo-empresario-modal/nuevo-empresario-modal.component';
import { NgApexchartsModule } from 'ng-apexcharts';
export function playerFactory() {
  return player;
}
@NgModule({
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgApexchartsModule,FormsModule,ReactiveFormsModule, CommonModule, ModalModule.forRoot(), LottieModule.forRoot({ player: playerFactory })],
  declarations: [
    AppComponent,
    LayoutBaseComponent,
    LayoutSystemComponent,
    ScrollToTopComponent,
    PerfilUsuarioComponent,
    NuevoEmpresarioModalComponent,
    NotFoundComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
