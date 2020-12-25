import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { ColumnComponent } from './components/column/column.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login-registration/login/login.component';
import { RegistrationComponent } from './components/login-registration/registration/registration.component';
import { MainComponent } from './components/main/main.component';
import { ProjectCreationComponent } from './components/modals/project-creation/project-creation.component';
import { ProjectManagementComponent } from './components/project-management/project-management.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StartPromptComponent } from './components/start-prompt/start-prompt.component';
import { StoryComponent } from './components/story/story.component';
import { TeamManagementComponent } from './components/team-management/team-management.component';
import { InputWrapperComponent } from './components/wrappers/input-wrapper/input-wrapper.component';
import { SelectWrapperComponent } from './components/wrappers/select-wrapper/select-wrapper.component';
import { LoaderInterceptor } from './interceptors/loader-interceptor.interceptor';
import Effects from './redux/effects';
import Reducers from './redux/store';
import { HttpService } from './services/http.service';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ColumnComponent,
        MainComponent,
        StoryComponent,
        SidebarComponent,
        LoginComponent,
        RegistrationComponent,
        TeamManagementComponent,
        ProjectManagementComponent,
        StartPromptComponent,
        BoardComponent,
        InputWrapperComponent,
        SelectWrapperComponent,
        ProjectCreationComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        DragDropModule,
        StoreModule.forRoot(Reducers, {}),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        EffectsModule.forRoot(Effects),
        MatIconModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatDialogModule,
    ],
    providers: [HttpService, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor() {}
}
