import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { LayoutBaseComponent } from './layout/layout-client/layout-base.component';
import { LayoutSystemComponent } from './layout/layout-system/layout-system.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UsuariosListsComponent } from './usuarios-lists/usuarios-lists.component';
import { PycListComponent } from './pyc-list/pyc-list.component';

export function playerFactory() {
  return player;
}
@NgModule({
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ModalModule.forRoot(), LottieModule.forRoot({ player: playerFactory })],
  declarations: [
    AppComponent,
    LayoutBaseComponent,
    LayoutSystemComponent,
    ScrollToTopComponent,
    NotFoundComponent,
    UsuariosListsComponent,
    PycListComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
