import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormpreguntaasComponent } from './formpreguntaas/formpreguntaas.component';
import { PerfiluserComponent } from './perfiluser/perfiluser.component';
import { PostulacionesComponent } from './pages/postulaciones/postulaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FormpreguntaasComponent,
    PerfiluserComponent,
    PostulacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
