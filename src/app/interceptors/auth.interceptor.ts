import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalStorageKeys, clearLocalStorage, getToken, getTokenTimeOut } from './local-storage-manager';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class LoaderPeticionesInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    private _activeRequest = 0;

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        const token = getToken(LocalStorageKeys.TOKEN);

        console

        if (token) {
            if (getTokenTimeOut(token)) {
                return this.handleTokenTimeout();
            }

            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }

        return next.handle(request);
    }

    private handleTokenTimeout(): Observable<HttpEvent<unknown>> {
        this.openMessage();

        setTimeout(() => {
            clearLocalStorage();
            this.router.navigate(['/login']).then(() => { window.location.reload(); });
        }, 3000);
        return throwError('Token timeout');
    }

    private openMessage() {
      let timerInterval;
      Swal.fire({
        title: "¡Tu sesión ha expirado!",
        timer: 5000,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup()?.querySelector("b");
          timerInterval = setInterval(() => {
            if (timer) {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }
          }, 100);
        }
      });
    }
}
