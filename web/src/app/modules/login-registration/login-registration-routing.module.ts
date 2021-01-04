import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../components/login-registration/login/login.component';
import { RegistrationComponent } from '../../components/login-registration/registration/registration.component';

const routes: Routes = [
    {
        path: 'sign-in',
        component: LoginComponent,
    },
    {
        path: 'registration',
        component: RegistrationComponent,
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class LoginRegistrationRoutingModule {}
