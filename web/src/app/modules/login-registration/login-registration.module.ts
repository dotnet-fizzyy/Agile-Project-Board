import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from '../../components/login-registration/login/login.component';
import { RegistrationComponent } from '../../components/login-registration/registration/registration.component';
import { WrappersModule } from '../wrappers/wrappers.module';
import { LoginRegistrationRoutingModule } from './login-registration-routing.module';

@NgModule({
    declarations: [LoginComponent, RegistrationComponent],
    imports: [
        CommonModule,
        LoginRegistrationRoutingModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatInputModule,
        FormsModule,
        WrappersModule,
    ],
    exports: [LoginComponent, RegistrationComponent],
})
export class LoginRegistrationModule {}
