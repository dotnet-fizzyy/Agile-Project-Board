import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { IProject } from 'src/app/utils/interfaces';
import * as WebApiRoutes from '../../utils/constants/webapi-routes';
import * as ProjectActions from '../actions/project.actions';
import { HttpService } from './../../services/http.service';

@Injectable()
export default class ProjectEffects {
    constructor(private actions$: Actions, private httpService: HttpService) {}

    getProjectDesc$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProjectActions.ProjectActions.GET_PROJECT_DESC_REQUEST),
            map(() => {
                return null;
            })
        )
    );

    createProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType<ProjectActions.CreateProjectRequest>(ProjectActions.ProjectActions.CREATE_PROJECT_REQUEST),
            mergeMap((action) => this.httpService.post(WebApiRoutes.ProjectRoutes.CREATE_PROJECT, action.type)),
            map((response) => {
                const createdProject = ProjectEffects.mapToProject(response);

                return new ProjectActions.CreateProjectSuccess(createdProject);
            }),
            catchError((error) => of(new ProjectActions.CreateProjectFailure(error)))
        )
    );

    private static mapToProject(response: any): IProject {
        return {
            projectId: response.projectId,
            projectName: response.projectName,
            startDate: response.startDate,
            endDate: response.endDate,
            customerId: response.customerId,
        } as IProject;
    }
}
