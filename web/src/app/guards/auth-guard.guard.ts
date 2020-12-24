import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseGuard } from './base-guard';

@Injectable()
export class AuthGuard extends BaseGuard {
    constructor(router: Router) {
        super(router);
    }

    public willActivate(): boolean {
        return true;
    }
}
