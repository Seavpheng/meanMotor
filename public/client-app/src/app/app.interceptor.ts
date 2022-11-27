import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private authService : AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthToken(request));
  }

  addAuthToken(request : HttpRequest<any>){
    const token = this.authService.token;

    return request.clone({
      setHeaders : {
        Authorization :`Bearer ${token}`
      }
    });
  }
}
