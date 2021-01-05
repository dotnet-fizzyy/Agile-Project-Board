import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { isUserAuthenticated } from '../utils/helpers';

@Injectable({
    providedIn: 'root',
})
export class SignedInGuard implements CanActivate {
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return !isUserAuthenticated();
    }
}
