import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Constants} from "../_components/_core/Constants";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUserToken')) {

          // Query do db ci je existujuci token platny
          // TODO

          // logged in so return true
          return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate([Constants.ROUTE_IDENTIFIER_LOGIN], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
