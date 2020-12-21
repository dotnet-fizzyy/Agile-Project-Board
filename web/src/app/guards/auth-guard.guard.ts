import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseGuard } from './base-guard';

@Injectable()
export class AuthGuard extends BaseGuard implements CanActivate {
    constructor(router: Router) {
        super(router);
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        super.isUserAuthenticated();

        return true;
    }
}
