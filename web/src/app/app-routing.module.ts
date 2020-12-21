import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as AppRoutes from '../app/utils/constants/routes';
import { LoginComponent } from './components/login-registration/login/login.component';
import { RegistrationComponent } from './components/login-registration/registration/registration.component';
import { MainComponent } from './components/main/main.component';
import { ProjectManagementComponent } from './components/project-management/project-management.component';
import { TeamManagementComponent } from './components/team-management/team-management.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { CustomerGuard } from './guards/customer.guard';

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
    {
        path: AppRoutes.UiRoutes.TEAM,
        component: TeamManagementComponent,
        canActivate: [CustomerGuard],
    },
    {
        path: AppRoutes.UiRoutes.PROJECT,
        component: ProjectManagementComponent,
        canActivate: [CustomerGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard, CustomerGuard],
})
export class AppRoutingModule {}
