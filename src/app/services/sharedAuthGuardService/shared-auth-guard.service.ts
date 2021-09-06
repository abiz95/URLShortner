import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthSharedService } from 'src/app/services/authShared/auth-shared.service';

@Injectable({
  providedIn: 'root'
})
export class SharedAuthGuardService {

  constructor(private router: Router, private auth: AuthSharedService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(['access/signin'])
    return false;
  }
}
