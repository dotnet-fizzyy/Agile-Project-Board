import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { isUserAuthenticated } from '../utils/helpers';

export abstract class BaseGuard implements CanActivate {
    protected readonly router: Router;

    constructor(router: Router) {
        this.router = router;
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (!isUserAuthenticated()) {
            return this.router.navigateByUrl('sign-in');
        }

        return this.willActivate();
    }

    public abstract willActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>;
}
