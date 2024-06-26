import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutBaseComponent } from './layout/layout-client/layout-base.component';
import { LayoutSystemComponent } from './layout/layout-system/layout-system.component';
import { AuthGuard } from './pages/authentication/login/AuthGuard';
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
    path: 'web-builder',
    redirectTo: 'web-builder/contructor',
    pathMatch: 'full'
  },
  {
    path: 'inicio', component: LayoutBaseComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/start/start.module').then((m) => m.StartModule) },
    ]
  },
  {
    path: 'system', component: LayoutSystemComponent, canActivate: [AuthGuard],
    children: [
      { path: 'alumni', loadChildren: () => import('./pages/alumni/alumni.module').then((m) => m.AlumniModule) },
      { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule) },
      { path: 'company', loadChildren: () => import('./pages/company/company.module').then((m) => m.CompanyModule) },
      { path: 'career-manager', loadChildren: () => import('./pages/responsable-carrera/responsable-carrera.module').then((m) => m.ResponsableCarreraModule) }
    ], 
  },

  // Ruta inicial
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
