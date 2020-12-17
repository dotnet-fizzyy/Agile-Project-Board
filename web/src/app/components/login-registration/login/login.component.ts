import { Component, DoCheck, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ILoginCreationsState } from 'src/app/redux/store/state';
import { IAuthenticationUser } from 'src/app/utils/interfaces';
import { LoginSignInActionRequest } from '../../../redux/actions/login-registration.actions';
import * as LoginRegistrationSelectors from '../../../redux/selectors/loginRegistration.selectors';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, DoCheck {
    readonly name = 'name';
    readonly password = 'password';

    isSuccessfulSignIn: boolean;
    readonly successLogin$ = this.store$
        .select(LoginRegistrationSelectors.getIsSignInSuccessful)
        .subscribe((x) => (this.isSuccessfulSignIn = x));

    profileForm: FormGroup;

    constructor(private fb: FormBuilder, private store$: Store<ILoginCreationsState>, private router: Router) {}

    ngDoCheck(): void {
        if (this.isSuccessfulSignIn) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit(): void {
        this.profileForm = this.fb.group({
            [this.name]: ['', Validators.required],
            [this.password]: ['', Validators.required],
        });
    }

    onClickSignIn(): void {
        const authModel: IAuthenticationUser = {
            username: this.profileForm.get(this.name).value,
            password: this.profileForm.get(this.password).value,
        };

        this.store$.dispatch(new LoginSignInActionRequest(authModel));
    }
}
