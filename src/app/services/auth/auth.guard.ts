import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';

import {AuthService} from "./auth.service";
import {GlobalService} from "../global.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private globalService: GlobalService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.onVerify().pipe(map((response) => {
      if (!response.success) {
        this.globalService.isAuthencicated = false
        return true
      } else {
        this.globalService.isAuthencicated = true
        this.router.navigate(['/'])
        return false
      }
    }))
  }

}
