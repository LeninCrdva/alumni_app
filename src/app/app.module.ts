import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormpreguntaasComponent } from './formpreguntaas/formpreguntaas.component';
import { PostulacionesComponent } from './pages/postulaciones/postulaciones.component';
import { VisualizarcvComponent } from './visualizarcv/visualizarcv.component';
import { SlidebarComponent } from './modules/slidebar/slidebar.component';
import { DetallescandidatoComponent } from './detallescandidato/detallescandidato.component';
import { InitComponent } from './pages/init/init.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { StateListComponent } from './state-list/state-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobDetailsCandidatesComponent } from './job-details-candidates/job-details-candidates.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FormpreguntaasComponent,
    PostulacionesComponent,
    VisualizarcvComponent,
   SlidebarComponent,
   DetallescandidatoComponent,
   InitComponent,
   CompanyDetailsComponent,
   StateListComponent,
   JobDetailsComponent,
   JobDetailsCandidatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
