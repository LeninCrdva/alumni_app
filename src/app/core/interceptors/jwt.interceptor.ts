import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Observable } from "rxjs";
import { AuthService } from "src/app/modules/auth/services/auth.service";

const LOGIN_URL = 'http://springgc1-env.eba-mf2fnuvf.us-east-1.elasticbeanstalk.com/auth/login';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.getUser();
    const isAuthenticated = currentUser && currentUser.accessToken;
    console.log('Interceptor Level 1');
    if (isAuthenticated) {
      console.log('Interceptor Level 2');
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.accessToken}`
        }
      })
    }
    return next.handle(req);
  }

} 