import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ModalComponentTypes, ModalType } from 'src/app/utils/constants';
import { IModalData, IProject } from 'src/app/utils/interfaces';
import * as ProjectActions from '../../redux/actions/project.actions';
import * as ProjectSelectors from '../../redux/selectors/project.selectors';
import { IProjectState } from '../../redux/store/state';
import * as InitialStates from '../../utils/constants/initialStates';
import { IEpic, ISprint } from '../../utils/interfaces';
import { EpicCreationComponent } from '../modals/epic-creation/epic-creation.component';
import { ProjectCreationComponent } from '../modals/project-creation/project-creation.component';
import { SprintCreationComponent } from '../modals/sprint-creation/sprint-creation.component';

@Component({
    selector: 'app-project-management',
    templateUrl: './project-management.component.html',
    styleUrls: ['./project-management.component.scss'],
})
export class ProjectManagementComponent implements OnInit {
    public project: IProject;
    public epics: IEpic[];
    public sprints: ISprint[];

    constructor(private store$: Store<IProjectState>, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.store$.dispatch(new ProjectActions.GetProjectRequest());

        this.store$.select(ProjectSelectors.getProject).subscribe((x) => (this.project = x));
        this.store$.select(ProjectSelectors.getEpics).subscribe((x) => (this.epics = x));
        this.store$.select(ProjectSelectors.getSprints).subscribe((x) => (this.sprints = x));
    }

    public onClickCreateProject = (): void => {
        this.openDialog(ProjectCreationComponent, {
            type: ModalType.CREATE,
            data: InitialStates.projectInitialState,
        });
    };

    public onClickUpdateProject = (): void => {
        this.openDialog(ProjectCreationComponent, {
            type: ModalType.UPDATE,
            data: this.project,
        });
    };

    public onClickAddEpic = (): void => {
        this.openDialog(EpicCreationComponent, {
            type: ModalType.CREATE,
            data: InitialStates.epicInitialState,
        });
    };

    public onClickAddSprint = (): void => {
        this.openDialog(SprintCreationComponent, {
            type: ModalType.CREATE,
            data: InitialStates.sprintInitialState,
        });
    };

    public onClickViewSprintsFromEpic = (epicId: string): void => {
        this.store$.dispatch(new ProjectActions.GetSprintsFromEpicRequest(epicId));
    };

    public onClickUpdateEpic = (epic: IEpic): void => {
        this.openDialog(EpicCreationComponent, {
            type: ModalType.UPDATE,
            data: epic,
        });
    };

    public onClickRemoveEpic = (epicId: string): void => {};

    public onClickUpdateSprint = (sprint: ISprint): void => {
        this.openDialog(SprintCreationComponent, {
            type: ModalType.UPDATE,
            data: sprint,
        });
    };

    public onClickRemoveSprint = (sprintId: string): void => {};

    private openDialog = (component: ModalComponentTypes, data: IModalData) => {
        this.dialog.open(component, {
            width: '400px',
            data,
        });
    };
}
