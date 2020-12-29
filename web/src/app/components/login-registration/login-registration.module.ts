import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WrappersModule } from '../wrappers/wrappers.module';
import { LoginRegistrationRoutingModule } from './login-registration-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

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
