import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginserviceService } from '../../services/login/loginservice.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivateChild, CanActivate {
  constructor(private loginService: LoginserviceService, private router: Router) {}
  canActivate() {
    if (this.loginService.IsUserLoggedIn) {
      return true;
    } else {
      this.router.navigate(['login']);
    return false;
    }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.loginService.IsUserLoggedIn) {
        let adminCall = false;
        state.url.split('/').forEach((urlparam) => {
          if (urlparam === 'admin') {
            adminCall = true;
          }
        });
        if (adminCall) {
          if (this.loginService.loggedInUser.admin === true) {
            return true;
          } else {
            this.router.navigate(['login']);
            return false;
          }
        } else {
          return true;
        }
      } else {
        this.router.navigate(['login']);
      }
  }
}
