import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { IFullProjectDescription, IProject, ISprint } from 'src/app/utils/interfaces';
import * as WebApiRoutes from '../../utils/constants/webapi-routes';
import * as ProjectActions from '../actions/project.actions';
import { HttpService } from './../../services/http.service';
import { IEpic } from './../../utils/interfaces/index';
import { IProjectState } from './../store/state';

@Injectable()
export default class ProjectEffects {
    constructor(private actions$: Actions, private httpService: HttpService, private store$: Store<IProjectState>) {}

    getProjectDesc$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProjectActions.ProjectActions.GET_PROJECT_DESC_REQUEST),
            mergeMap(() => this.httpService.get(WebApiRoutes.ProjectRoutes.CREATE_PROJECT)),
            map((response) => {
                const fullProjectDescription = ProjectEffects.mapToFullProject(response);

                return new ProjectActions.GetProjectSuccess(fullProjectDescription);
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new ProjectActions.GetProjectFailure(error));

                return caught;
            })
        )
    );

    createProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType<ProjectActions.CreateProjectRequest>(ProjectActions.ProjectActions.CREATE_PROJECT_REQUEST),
            mergeMap((action) => this.httpService.post(WebApiRoutes.ProjectRoutes.CREATE_PROJECT, action.payload)),
            map((response) => {
                const createdProject = ProjectEffects.mapToProject(response);

                return new ProjectActions.CreateProjectSuccess(createdProject);
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new ProjectActions.CreateSprintFailure(error));

                return caught;
            })
        )
    );

    createEpic$ = createEffect(() =>
        this.actions$.pipe(
            ofType<ProjectActions.CreateEpicRequest>(ProjectActions.ProjectActions.CREATE_EPIC_REQUEST),
            mergeMap((action) => this.httpService.post(WebApiRoutes.EpicRoutes.CREATE_EPIC, action.payload)),
            map((response) => {
                const createdEpic = ProjectEffects.mapToEpic(response);

                return new ProjectActions.CreateEpicSuccess(createdEpic);
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new ProjectActions.CreateEpicFailure(error));

                return caught;
            })
        )
    );

    createSprint$ = createEffect(() =>
        this.actions$.pipe(
            ofType<ProjectActions.CreateSprintRequest>(ProjectActions.ProjectActions.CREATE_SPRINT_REQUEST),
            mergeMap((action) => this.httpService.post(WebApiRoutes.SprintRoutes.CREATE_SPRINT, action.payload)),
            map((response) => {
                const createdSprint = ProjectEffects.mapToSprint(response);

                return new ProjectActions.CreateSprintSuccess(createdSprint);
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new ProjectActions.CreateSprintFailure(error));

                return caught;
            })
        )
    );

    private static mapToFullProject(response: any): IFullProjectDescription {
        return {
            project: ProjectEffects.mapToProject(response.project),
            epics: response.epics.map((x: any) => ProjectEffects.mapToEpic(x)),
        } as IFullProjectDescription;
    }

    private static mapToProject(response: any): IProject {
        return {
            projectId: response.projectId,
            projectName: response.projectName,
            startDate: response.startDate,
            endDate: response.endDate,
            customerId: response.customerId,
        } as IProject;
    }

    private static mapToEpic(response: any): IEpic {
        return {
            epicId: response.epicId,
            epicName: response.epicName,
            startDate: response.startDate,
            endDate: response.endDate,
            projectId: response.projectId,
        } as IEpic;
    }

    private static mapToSprint(response: any): ISprint {
        return {
            sprintId: response.sprintId,
            sprintName: response.sprintName,
            startDate: response.startDate,
            endDate: response.endDate,
            epicId: response.epicId,
        } as ISprint;
    }
}
