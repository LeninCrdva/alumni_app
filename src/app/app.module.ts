import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormpreguntaasComponent } from './formpreguntaas/formpreguntaas.component';
import { PerfiluserComponent } from './perfiluser/perfiluser.component';
import { PostulacionesComponent } from './pages/postulaciones/postulaciones.component';
import { VisualizarcvComponent } from './visualizarcv/visualizarcv.component';
import { SlidebarComponent } from './modules/slidebar/slidebar.component';
import { DetallescandidatoComponent } from './detallescandidato/detallescandidato.component';
import { InitComponent } from './pages/init/init.component';

=======
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { LayoutBaseComponent } from './layout/layout-client/layout-base.component';
import { LayoutSystemComponent } from './layout/layout-system/layout-system.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
>>>>>>> parent of b58325d (Cambios (TODO BIEN))

@NgModule({
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ModalModule.forRoot(), LottieModule.forRoot({ player: playerFactory })],
  declarations: [
    AppComponent,
<<<<<<< HEAD
    LoginComponent,
    HomeComponent,
    FormpreguntaasComponent,
    PerfiluserComponent,
    PostulacionesComponent,
    VisualizarcvComponent,
   // RegistroProvinciasComponent
   SlidebarComponent,
   DetallescandidatoComponent,
   InitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
=======
    LayoutBaseComponent,
    LayoutSystemComponent,
    ScrollToTopComponent,
>>>>>>> parent of b58325d (Cambios (TODO BIEN))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
