import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseGuard } from './base-guard';

@Injectable()
export class AuthGuard extends BaseGuard {
    constructor(router: Router) {
        super(router);
    }

    public willActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return true;
    }
}
