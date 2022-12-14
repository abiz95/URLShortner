import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthSharedService } from '../authShared/auth-shared.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private authSharedService: AuthSharedService, private router: Router) { }

  userLoginStatus() : boolean {
    if (this.authSharedService.isUserLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("status", this.authSharedService.getLoggedInToken() === '[object Object]')
      return next.handle(request).pipe(catchError(err => {
          if ([401].includes(err.status) && this.userLoginStatus()) {
              // auto logout if 401 or 403 response returned from api
              console.log("userLoginStatus", status)
              this.authSharedService.logout();
          }
          else if([0, 403].includes(err.status) && this.userLoginStatus()) {
            // auto logout if 401 or 403 response returned from api
            let oldToken = this.authSharedService.getLoggedInToken();
            console.log("oldToken", JSON.stringify(oldToken))
            this.authSharedService.generateRefreshToken(oldToken);
          } 
          else if(this.authSharedService.getLoggedInToken() === '[object Object]') {
            this.authSharedService.logout();
          }
          
          else {
            console.log("all conditions failed: ", status)
            // this.authSharedService.logout();
            // this.router.navigate(['../error'])
          }
          const error = (err && err.error && err.error.message) || err.statusText;
          console.error("error messgae: ", err.error);
          console.error("error details: ", err);
          return throwError(error);
      }))
  }
  
}
