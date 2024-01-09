import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormpreguntaasComponent } from './formpreguntaas/formpreguntaas.component';
import { PerfiluserComponent } from './perfiluser/perfiluser.component';
import { RegisterComponent } from './register/register.component';
import { ProvinciaComponent } from './provincia/provincia.component';
import { CiudadesComponent } from './ciudades/ciudades.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FormpreguntaasComponent,
    PerfiluserComponent,
    RegisterComponent,
    ProvinciaComponent,
    CiudadesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
