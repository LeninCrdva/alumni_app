import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import{LoginComponent} from './login/login.component';
import { FormpreguntaasComponent } from './formpreguntaas/formpreguntaas.component';
import { RegisterComponent } from './register/register.component';
import { PostulacionesComponent } from './pages/postulaciones/postulaciones.component';
import { VisualizarcvComponent } from './visualizarcv/visualizarcv.component';
import { DetallescandidatoComponent } from './detallescandidato/detallescandidato.component';
import { ParametrospreguntasComponent } from './parametrospreguntas/parametrospreguntas.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { StateListComponent } from './state-list/state-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobDetailsCandidatesComponent } from './job-details-candidates/job-details-candidates.component';
import { CarrerasCrudComponent } from './carreras-crud/carreras-crud.component';
import { SectorEmpresarialCrudComponent } from './sector-empresarial-crud/sector-empresarial-crud.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path: 'login',component: LoginComponent},
  { path: 'preguntas', component: FormpreguntaasComponent},
  {path: 'register',component: RegisterComponent},
  {path:'postulaciones',component:PostulacionesComponent},
  {path: 'curriculum',component:VisualizarcvComponent},
  {path: 'person-details',component:DetallescandidatoComponent},
  {path:'parametros-preguntas', component:ParametrospreguntasComponent},
  {path: 'company-details' , component: CompanyDetailsComponent},
  {path:'estados', component: StateListComponent},   
  {path: 'job-detail', component:JobDetailsComponent}, 
  {path: 'job-detail-candidates', component:JobDetailsCandidatesComponent}, 
  {path:'carrear', component:CarrerasCrudComponent},
  {path:'sector-empresarial', component:SectorEmpresarialCrudComponent},

 // { path: 'register-provincias', component: RegistroProvinciasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
