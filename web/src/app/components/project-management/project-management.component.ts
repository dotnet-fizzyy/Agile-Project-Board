import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ModalComponentTypes, ModalCreationType } from 'src/app/utils/constants';
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

    public onClickCreateProjectButton = (): void => {
        this.openDialog(ProjectCreationComponent, {
            modalType: ModalCreationType.Project,
            model: InitialStates.projectInitialState,
        });
    };

    public onClickAddEpicButton = (): void => {
        this.openDialog(EpicCreationComponent, {
            modalType: ModalCreationType.Epic,
            model: InitialStates.epicInitialState,
        });
    };

    public onClickAddSprintButton = (): void => {
        this.openDialog(SprintCreationComponent, {
            modalType: ModalCreationType.Sprint,
            model: InitialStates.sprintInitialState,
        });
    };

    public onClickViewSprintsFromEpic = (epicId: string): void => {};

    public onClickUpdateEpic = (epic: IEpic): void => {
        this.openDialog(EpicCreationComponent, { modalType: ModalCreationType.Epic, model: epic });
    };

    public onClickRemoveEpic = (epicId: string): void => {};

    public onClickUpdateSprint = (sprint: ISprint): void => {
        this.openDialog(SprintCreationComponent, { modalType: ModalCreationType.Sprint, model: sprint });
    };

    public onClickRemoveSprint = (sprintId: string): void => {};

    private openDialog = (component: ModalComponentTypes, data: IModalData) => {
        this.dialog.open(component, {
            width: '400px',
            data,
        });
    };
}
