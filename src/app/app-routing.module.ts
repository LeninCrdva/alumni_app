import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { HomeComponent } from './home/home.component';
import{LoginComponent} from './login/login.component';
import { FormpreguntaasComponent } from './formpreguntaas/formpreguntaas.component';
import { RegisterComponent } from './register/register.component';
import { PerfiluserComponent } from './perfiluser/perfiluser.component';
import { PostulacionesComponent } from './pages/postulaciones/postulaciones.component';
import { VisualizarcvComponent } from './visualizarcv/visualizarcv.component';
import { DetallescandidatoComponent } from './detallescandidato/detallescandidato.component';
import { ParametrospreguntasComponent } from './parametrospreguntas/parametrospreguntas.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path: 'login',component: LoginComponent},
  { path: 'preguntas', component: FormpreguntaasComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'perfil-usuario',component: PerfiluserComponent},
  {path:'postulaciones',component:PostulacionesComponent},
  {path: 'curriculum',component:VisualizarcvComponent},
  {path: 'candidato-details',component:DetallescandidatoComponent},
  {path:'parametros-preguntas', component:ParametrospreguntasComponent}
  
 // { path: 'register-provincias', component: RegistroProvinciasComponent}
=======
import { LayoutBaseComponent } from './layout/layout-client/layout-base.component';
import { LayoutSystemComponent } from './layout/layout-system/layout-system.component';

const routes: Routes = [
  {
    path: 'account',
    redirectTo: 'account/login',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
  },
  {
    path: 'inicio', component: LayoutBaseComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/start/start.module').then((m) => m.StartModule) }
    ]
  },
  {
    path: 'system', component: LayoutSystemComponent,
    children: [
      { path: 'alumni', loadChildren: () => import('./pages/alumni/alumni.module').then((m) => m.AlumniModule) },
      { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule) }
    ], // Steve: Revisar esto: canActivate: [AuthGuard]
  },

  // Ruta inicial
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
>>>>>>> parent of b58325d (Cambios (TODO BIEN))
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
