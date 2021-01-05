import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderInterceptor } from './interceptors/loader-interceptor.interceptor';
import { LoginRegistrationModule } from './modules/login-registration/login-registration.module';
import { MainAppModule } from './modules/main-app/main-app.module';
import { WrappersModule } from './modules/wrappers/wrappers.module';
import Effects from './redux/effects';
import Reducers from './redux/store';
import { HttpService } from './services/http.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        StoreModule.forRoot(Reducers, {}),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        EffectsModule.forRoot(Effects),
        LoginRegistrationModule,
        WrappersModule,
        MainAppModule,
        RouterModule,
        AppRoutingModule,
    ],
    providers: [HttpService, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor() {}
}
