import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoles } from '../utils/constants';
import { getUser } from '../utils/helpers';
import { BaseGuard } from './base-guard';

@Injectable()
export class CustomerGuard extends BaseGuard {
    constructor(router: Router, private location: Location) {
        super(router);
    }

    public willActivate(): boolean {
        const user = getUser();

        if (user.userRole !== UserRoles.Customer) {
            this.location.back();
        }

        return true;
    }
}
