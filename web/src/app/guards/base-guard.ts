import { Router } from '@angular/router';
import { UiRoutes } from '../utils/constants/routes';
import { isUserAuthenticated } from '../utils/helpers';

export class BaseGuard {
    protected readonly router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    isUserAuthenticated(): Promise<boolean> {
        if (!isUserAuthenticated()) {
            return this.router.navigateByUrl(UiRoutes.SIGN_IN);
        }
    }
}
