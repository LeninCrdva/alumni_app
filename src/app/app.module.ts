import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormpreguntaasComponent } from './formpreguntaas/formpreguntaas.component';
import { PerfiluserComponent } from './perfiluser/perfiluser.component';
import { PostulacionesComponent } from './pages/postulaciones/postulaciones.component';
import { VisualizarcvComponent } from './visualizarcv/visualizarcv.component';
import { SlidebarComponent } from './modules/slidebar/slidebar.component';
import { DetallescandidatoComponent } from './detallescandidato/detallescandidato.component';
import { InitComponent } from './pages/init/init.component';


@NgModule({
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ModalModule.forRoot(), LottieModule.forRoot({ player: playerFactory })],
  declarations: [
    AppComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
