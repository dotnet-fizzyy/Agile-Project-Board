import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RegistrationCreateAccountActionRequest } from 'src/app/redux/actions/login-registration.actions';
import { ILoginCreationsState } from 'src/app/redux/store/state';
import { IAuthenticationUser } from 'src/app/utils/interfaces';
import * as loaderSelectors from '../../../redux/selectors/loader.selectors';
import * as loginRegistrationSelectors from '../../../redux/selectors/loginRegistration.selectors';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
    readonly nameValidators = [Validators.required, Validators.minLength(4), Validators.maxLength(16)];

    readonly name = 'name';
    readonly password = 'password';
    readonly repeatedPassword = 'repeatedPassword';
    readonly isRegistrationSuccessful$: Observable<boolean> = this.store$.select(
        loginRegistrationSelectors.getIsRegistrationSuccessful
    );
    readonly isLoading$: Observable<boolean> = this.store$.select(loaderSelectors.getIsLoading);

    registrationForm: FormGroup;

    constructor(private fb: FormBuilder, private store$: Store<ILoginCreationsState>) {}

    ngOnInit(): void {
        this.registrationForm = this.fb.group({
            [this.name]: ['', Validators.compose(this.nameValidators)],
            [this.password]: ['', Validators.required],
            [this.repeatedPassword]: ['', Validators.required],
        });
    }

    onClickCreateAccount(): void {
        const authModel: IAuthenticationUser = {
            username: this.registrationForm.get(this.name).value,
            password: this.registrationForm.get(this.password).value,
        };

        this.store$.dispatch(new RegistrationCreateAccountActionRequest(authModel));
    }

    verifyPasswords = (): boolean =>
        this.registrationForm.get(this.password).touched &&
        this.registrationForm.get(this.repeatedPassword).touched &&
        this.registrationForm.get(this.password).value !== this.registrationForm.get(this.repeatedPassword).value;
}
