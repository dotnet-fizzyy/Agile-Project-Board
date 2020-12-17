import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as AppRoutes from '../utils/constants/routes';
import { isUserAuthenticated } from '../utils/helpers';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!isUserAuthenticated()) {
            return this.router.parseUrl(AppRoutes.UiRoutes.SIGN_IN);
        }

        return true;
    }
}
