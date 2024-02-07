import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';
import {  ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const authorities = localStorage.getItem('authorities');
    
    if (token && authorities) {
      const role = authorities.match(/[a-zA-Z_]+/)?.[0];
      
      // Verificar el rol del usuario y la ruta a la que intenta acceder
      if (role === 'ROL_GRADUADO' && state.url.includes('alumni')) {
        return true; // Permitir acceso a alumni solo si es graduado
      } else if (role === 'ROL_EMPRESARIO' && state.url.includes('company')) {
        return true; // Permitir acceso a company solo si es empresario
      } else if (role === 'ROL_ADMINISTRADOR' && state.url.includes('admin')) {
        return true; // Permitir acceso a admin solo si es administrador
      } else {
       
        Swal.fire({
          icon: 'error',
          title: 'Acceso denegado',
          text: 'No tiene permisos para acceder a esta página',
        });
        this.router.navigate(['/inicio']); 
        return false;
      }
    } else {
     
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'Debe iniciar sesión para acceder a esta página',
      });
      this.router.navigate(['/account/login']); 
      return false;
    }
  }
}
