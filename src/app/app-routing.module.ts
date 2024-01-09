import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import{LoginComponent} from './login/login.component';
import { FormpreguntaasComponent } from './formpreguntaas/formpreguntaas.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path: 'login',component: LoginComponent},
  { path: 'preguntas', component: FormpreguntaasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
