import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRoles } from '../utils/constants';
import { getUser } from '../utils/helpers';
import { BaseGuard } from './base-guard';

@Injectable()
export class CustomerGuard extends BaseGuard implements CanActivate {
    constructor(router: Router, private location: Location) {
        super(router);
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        super.isUserAuthenticated();

        const user = getUser();

        if (user.userRole !== UserRoles.CUSTOMER) {
            this.location.back();
        }

        return true;
    }
}
