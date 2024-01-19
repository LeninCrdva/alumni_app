import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutBaseComponent } from './layout/layout-client/layout-base.component';
import { LayoutSystemComponent } from './layout/layout-system/layout-system.component';

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

  {
    path: 'System', component: LayoutSystemComponent,
    children: [
      { path: 'alumni', loadChildren: () => import('./pages/alumni/alumni.module').then((m) => m.AlumniModule) },
      { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule) }
    ], // Steve: Revisar esto: canActivate: [AuthGuard]
  },
  // { path: 'System', redirectTo: 'System', pathMatch: 'full' },

  // Ruta inicial
  { path: '**', redirectTo: 'Inicio', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
