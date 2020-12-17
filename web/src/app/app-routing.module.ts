import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as AppRoutes from '../app/utils/constants/routes';
import { LoginComponent } from './components/login-registration/login/login.component';
import { RegistrationComponent } from './components/login-registration/registration/registration.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './guards/auth-guard.guard';

const routes: Routes = [
    {
        path: AppRoutes.UiRoutes.HOME,
        component: MainComponent,
        canActivate: [AuthGuard],
    },
    {
        path: AppRoutes.UiRoutes.SIGN_IN,
        component: LoginComponent,
    },
    {
        path: AppRoutes.UiRoutes.REGISTRATION,
        component: RegistrationComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class AppRoutingModule {}
