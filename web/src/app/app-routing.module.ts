import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/app',
    },
    {
        path: 'app',
        loadChildren: () => import('./modules/main-app/main-app.module').then((x) => x.MainAppModule),
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./modules/login-registration/login-registration.module').then((x) => x.LoginRegistrationModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
