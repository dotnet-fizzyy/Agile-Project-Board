import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRoles } from '../utils/constants';
import { UiRoutes } from '../utils/constants/routes';
import { getUser, isUserAuthenticated } from '../utils/helpers';

@Injectable({
    providedIn: 'root',
})
export class CustomerGuard implements CanActivate {
    constructor(private router: Router, private location: Location) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!isUserAuthenticated()) {
            return this.router.parseUrl(UiRoutes.SIGN_IN);
        }

        const user = getUser();

        if (user.userRole !== UserRoles.CUSTOMER) {
            this.location.back();
        }

        return true;
    }
}
