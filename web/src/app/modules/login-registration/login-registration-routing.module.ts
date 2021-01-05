import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../components/login-registration/login/login.component';
import { RegistrationComponent } from '../../components/login-registration/registration/registration.component';
import { SignedInGuard } from '../../guards/signed-in.guard';

const routes: Routes = [
    {
        path: 'auth',
        children: [
            {
                path: '',
                redirectTo: 'sign-in',
                pathMatch: 'full',
            },
            {
                path: 'sign-in',
                component: LoginComponent,
                canActivate: [SignedInGuard],
            },
            {
                path: 'registration',
                component: RegistrationComponent,
                canActivate: [SignedInGuard],
            },
        ],
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [SignedInGuard],
})
export class LoginRegistrationRoutingModule {}
