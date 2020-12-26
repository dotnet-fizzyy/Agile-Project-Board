import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { LoginComponent } from './components/login-registration/login/login.component';
import { RegistrationComponent } from './components/login-registration/registration/registration.component';
import { ProjectManagementComponent } from './components/project-management/project-management.component';
import { StartPromptComponent } from './components/start-prompt/start-prompt.component';
import { TeamManagementComponent } from './components/team-management/team-management.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { CustomerGuard } from './guards/customer.guard';

const routes: Routes = [
    {
        path: '',
        component: StartPromptComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'sign-in',
        component: LoginComponent,
    },
    {
        path: 'registration',
        component: RegistrationComponent,
    },
    {
        path: 'team',
        component: TeamManagementComponent,
    },
    {
        path: 'project',
        component: ProjectManagementComponent,
        canActivate: [CustomerGuard],
    },
    {
        path: 'board/:projectId',
        component: BoardComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard, CustomerGuard],
})
export class AppRoutingModule {}
