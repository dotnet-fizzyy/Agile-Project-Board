import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as LoaderActions from '../redux/actions/loader-actions';
import * as UserSelectors from '../redux/selectors/users.selectors';
import { IStoreState } from './../redux/store/state';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private userId: string;

    constructor(private store$: Store<IStoreState>) {
        this.store$.select(UserSelectors.GetCurrentUser).subscribe((x) => (this.userId = x ? x.userId : ''));
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.store$.dispatch(new LoaderActions.SetLoadingEnabled());

        request = request.clone({ setHeaders: { 'x-end-user': this.userId } });

        return next.handle(request).pipe(
            tap(
                (event) => {
                    if (event instanceof HttpResponse) {
                        this.store$.dispatch(new LoaderActions.SetLoadingDisabled());
                    }
                },
                (err) => {
                    if (err instanceof HttpErrorResponse) {
                        this.store$.dispatch(new LoaderActions.SetLoadingDisabled());
                    }
                }
            )
        );
    }
}
