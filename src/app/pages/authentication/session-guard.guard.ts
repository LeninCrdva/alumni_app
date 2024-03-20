import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class sessionGuardGuard {
  constructor(private router: Router) {}

  canActivate() {
    const token = localStorage.getItem('token');
    if (token) {
      const role = localStorage.getItem('userRole');

      if (role === 'GRADUADO') {
        this.router.navigate(['/system/alumni/dashboard']);
        Swal.fire({
          icon: 'info',
          title: 'Ya tiene una sesión activa',
          text: 'Se redirigirá a la página principal del sistema',
        });
        return false;
      } else if (role === 'EMPRESARIO') {
        this.router.navigate(['/system/company/dashboard']);
        Swal.fire({
          icon: 'info',
          title: 'Ya tiene una sesión activa',
          text: 'Se redirigirá a la página principal del sistema',
        });
        return false;
      } else if (role === 'ADMINISTRADOR') {
        this.router.navigate(['/system/admin/dashboard']);
        Swal.fire({
          icon: 'info',
          title: 'Ya tiene una sesión activa',
          text: 'Se redirigirá a la página principal del sistema',
        });
        return false;
      }
    }

    return true;
  }
}