import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as ProjectActions from '../../redux/actions/project.actions';
import * as ProjectSelectors from '../../redux/selectors/project.selectors';
import { IProjectState } from './../../redux/store/state';
import { ProjectCreationComponent } from './../modals/project-creation/project-creation.component';

@Component({
    selector: 'app-project-management',
    templateUrl: './project-management.component.html',
    styleUrls: ['./project-management.component.scss'],
})
export class ProjectManagementComponent implements OnInit {
    project$ = this.store$.select(ProjectSelectors.getProject);
    epics$ = this.store$.select(ProjectSelectors.getEpics);
    sprints$ = this.store$.select(ProjectSelectors.getSprints);

    constructor(private store$: Store<IProjectState>, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.store$.dispatch(new ProjectActions.GetProjectRequest());
    }

    onClickCreateButton = (): void => {
        this.dialog.open(ProjectCreationComponent, { width: '400px' });
    };
}
