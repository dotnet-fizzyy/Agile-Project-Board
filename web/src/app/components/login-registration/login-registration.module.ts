import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InputWrapperComponent } from '../wrappers/input-wrapper/input-wrapper.component';
import { LoginRegistrationRoutingModule } from './login-registration-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
    declarations: [LoginComponent, RegistrationComponent, InputWrapperComponent],
    imports: [
        CommonModule,
        LoginRegistrationRoutingModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatInputModule,
        FormsModule,
    ],
    exports: [LoginComponent, RegistrationComponent],
})
export class LoginRegistrationModule {}
