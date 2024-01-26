import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../data/service/AuthService';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  'mensaje': string;
  'modalRef': BsModalRef;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(template: any): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe(
        (response) => {
          const accessToken = response.accessToken;
          console.log("token here: " + accessToken);

          const authorities: string[] = response.authorities.map((authority: { authority: any; }) => authority.authority);
          console.log("authorities here: " + authorities);
          localStorage.setItem('token', accessToken);
          localStorage.setItem('authorities', JSON.stringify(authorities));

          this.mensaje = 'success';
          this.modalRef = this.modalService.show(template);

          // Redirigir según el rol del usuario
          localStorage.setItem('name', username);
          this.redirectBasedOnAuthorities(authorities);
        },
        (error) => {
          // Manejar errores
          console.error('Error en el inicio de sesión', error);
          this.mensaje = 'error';
          this.modalRef = this.modalService.show(template); // Mostrar modal de error
        }
      );
    }
  }
  closeModal(): void {
    this.modalRef.hide();
    }
  private redirectBasedOnAuthorities(authorities: string[]): void {
    // Redirigir según el rol del usuario
    if (authorities.includes('ROL_ADMINISTRADOR')) {
      this.router.navigate(['system/admin']);
    } else if (authorities.includes('ROL_EMPRESARIO')) {
      this.router.navigate(['system/company']);
    } else {
      if (authorities.includes('ROL_GRADUADO')) {
        this.router.navigate(['system/alumni']);
      }
    }
  }
}
