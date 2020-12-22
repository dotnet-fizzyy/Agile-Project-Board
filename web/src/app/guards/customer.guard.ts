import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRoles } from '../utils/constants';
import { getUser } from '../utils/helpers';
import { BaseGuard } from './base-guard';

@Injectable()
export class CustomerGuard extends BaseGuard {
    constructor(router: Router, private location: Location) {
        super(router);
    }

    public willActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const user = getUser();

        if (user.userRole !== UserRoles.CUSTOMER) {
            this.location.back();
        }

        return true;
    }
}
