import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ModalCreationType } from 'src/app/utils/constants';
import * as ProjectActions from '../../redux/actions/project.actions';
import * as ProjectSelectors from '../../redux/selectors/project.selectors';
import { AdminCreationComponent } from '../modals/admin-creation/admin-creation.component';
import { IProjectState } from './../../redux/store/state';

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

    onClickCreateProjectButton = (): void => {
        this.openModal(ModalCreationType.Project);
    };

    onClickAddEpicButton = (): void => {
        this.openModal(ModalCreationType.Epic);
    };

    onClickAddSprintButton = (): void => {
        this.openModal(ModalCreationType.Sprint);
    };

    private openModal = (modalType: ModalCreationType): void => {
        this.dialog.open(AdminCreationComponent, { width: '400px', data: modalType });
    };
}
