import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { LoginRegistrationRoutingModule } from './components/login-registration/login-registration-routing.module';
import { MainComponent } from './components/main/main.component';
import { ProjectManagementComponent } from './components/project-management/project-management.component';
import { TeamManagementComponent } from './components/team-management/team-management.component';
import { UndefinedPageComponent } from './components/undefined-page/undefined-page.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { CustomerGuard } from './guards/customer.guard';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'team',
        component: TeamManagementComponent,
        canActivate: [CustomerGuard],
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
    {
        path: '**',
        component: UndefinedPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes), LoginRegistrationRoutingModule],
    exports: [RouterModule],
    providers: [AuthGuard, CustomerGuard],
})
export class AppRoutingModule {}
