import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {myLib} from "../../../helpers/myLib";


@Injectable({
  providedIn: 'root'
})
export class EnsureNotLoggedInGuard implements CanActivate {
  constructor(private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (myLib.auth.is()){
      this.router.navigateByUrl('/menu/dashboard')
    }
    return !myLib.auth.is();
  }

}
