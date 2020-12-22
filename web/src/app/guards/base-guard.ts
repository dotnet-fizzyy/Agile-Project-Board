import { Router } from '@angular/router';
import { isUserAuthenticated } from '../utils/helpers';

export class BaseGuard {
    protected readonly router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    isUserAuthenticated(): Promise<boolean> {
        if (!isUserAuthenticated()) {
            return this.router.navigateByUrl('sign-in');
        }
    }
}
