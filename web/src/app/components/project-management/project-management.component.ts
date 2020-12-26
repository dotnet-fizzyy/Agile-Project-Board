import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ModalCreationType } from 'src/app/utils/constants';
import { IProject } from 'src/app/utils/interfaces';
import * as ProjectActions from '../../redux/actions/project.actions';
import * as ProjectSelectors from '../../redux/selectors/project.selectors';
import { ProjectCreationComponent } from '../modals/project-creation/project-creation.component';
import { IProjectState } from './../../redux/store/state';
import { IEpic, ISprint } from './../../utils/interfaces/index';
import { EpicCreationComponent } from './../modals/epic-creation/epic-creation.component';
import { SprintCreationComponent } from './../modals/sprint-creation/sprint-creation.component';

@Component({
    selector: 'app-project-management',
    templateUrl: './project-management.component.html',
    styleUrls: ['./project-management.component.scss'],
})
export class ProjectManagementComponent implements OnInit {
    project: IProject;
    epics: IEpic[];
    sprints: ISprint[];

    project$ = this.store$.select(ProjectSelectors.getProject).subscribe((x) => (this.project = x));
    epics$ = this.store$.select(ProjectSelectors.getEpics).subscribe((x) => (this.epics = x));
    sprints$ = this.store$.select(ProjectSelectors.getSprints).subscribe((x) => (this.sprints = x));

    constructor(private store$: Store<IProjectState>, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.store$.dispatch(new ProjectActions.GetProjectRequest());
    }

    onClickCreateProjectButton = (): void => {
        this.dialog.open(ProjectCreationComponent, { width: '400px', data: ModalCreationType.Project });
    };

    onClickAddEpicButton = (): void => {
        this.dialog.open(EpicCreationComponent, { width: '400px', data: ModalCreationType.Epic });
    };

    onClickAddSprintButton = (): void => {
        this.dialog.open(SprintCreationComponent, { width: '400px', data: ModalCreationType.Sprint });
    };
}
