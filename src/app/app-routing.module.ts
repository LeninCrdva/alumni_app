import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { PostulacionesComponent } from './pages/alumni/postulaciones/postulaciones.component';
import { PerfilUsuarioComponent } from './pages/alumni/perfil-usuario/perfil-usuario.component';
import { LayoutBaseComponent } from './layout/layout-client/layout-base.component';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
  },
  {
    path: 'Inicio', component: LayoutBaseComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule) }
    ]
  },
  { path: 'account/login', redirectTo: 'account/login', pathMatch: 'full' },
  // Ruta inicial
  { path: '**', redirectTo: 'Inicio', pathMatch: 'full' },
];

// const routes: Routes = [
//   // { path: '**', redirectTo: '' },
//   { path: '', component: HomeComponent },
//   { path: 'home', component: HomeComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'alumni/postulaciones', component: PostulacionesComponent },
//   { path: 'alumni/perfil', component: PerfilUsuarioComponent },
// ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
