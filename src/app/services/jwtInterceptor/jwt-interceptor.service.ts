import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let tokenStr = sessionStorage.getItem('token');
    console.log("jwt token: "+tokenStr)
    if (tokenStr) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${tokenStr}`
            }
        });
    }

    return next.handle(request);
  }

}
