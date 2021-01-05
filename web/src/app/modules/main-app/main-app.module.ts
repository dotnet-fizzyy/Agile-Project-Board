import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardComponent } from '../../components/board/board.component';
import { ColumnComponent } from '../../components/column/column.component';
import { BoardHeaderComponent } from '../../components/headers/board-header/board-header.component';
import { MainHeaderComponent } from '../../components/headers/main-header/main-header.component';
import { MainAppComponent } from '../../components/main-app/main-app.component';
import { MainComponent } from '../../components/main/main.component';
import { EpicCreationComponent } from '../../components/modals/epic-creation/epic-creation.component';
import { ProjectCreationComponent } from '../../components/modals/project-creation/project-creation.component';
import { SprintCreationComponent } from '../../components/modals/sprint-creation/sprint-creation.component';
import { StoryCreationComponent } from '../../components/modals/story-creation/story-creation.component';
import { TeamManageComponent } from '../../components/modals/team-manage/team-manage.component';
import { UserCreationComponent } from '../../components/modals/user-creation/user-creation.component';
import { ProjectManagementComponent } from '../../components/project-management/project-management.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { StartPromptComponent } from '../../components/start-prompt/start-prompt.component';
import { StoryComponent } from '../../components/story/story.component';
import { TeamManagementComponent } from '../../components/team-management/team-management.component';
import { UndefinedPageComponent } from '../../components/undefined-page/undefined-page.component';
import { WrappersModule } from '../wrappers/wrappers.module';
import { MainAppRoutingModule } from './main-app-routing.module';

@NgModule({
    declarations: [
        MainHeaderComponent,
        ColumnComponent,
        MainComponent,
        StoryComponent,
        SidebarComponent,
        TeamManagementComponent,
        ProjectManagementComponent,
        StartPromptComponent,
        BoardComponent,
        ProjectCreationComponent,
        UserCreationComponent,
        EpicCreationComponent,
        SprintCreationComponent,
        StoryCreationComponent,
        TeamManageComponent,
        UndefinedPageComponent,
        BoardHeaderComponent,
        MainAppComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        DragDropModule,
        MatIconModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSelectModule,
        WrappersModule,
        MainAppRoutingModule,
    ],
    bootstrap: [MainAppComponent],
})
export class MainAppModule {}
