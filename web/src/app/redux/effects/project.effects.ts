import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import {
    IFullProjectDescription,
    IProject,
    ISprint,
    IStory,
    ITeam,
    ITeamManagementModel,
} from 'src/app/utils/interfaces';
import { HttpService } from '../../services/http.service';
import * as WebApiRoutes from '../../utils/constants/webapi-routes';
import { IEpic } from '../../utils/interfaces';
import * as ProjectActions from '../actions/project.actions';
import * as StoryActions from '../actions/stories.actions';
import * as TeamActions from '../actions/team.actions';
import { IProjectState } from '../store/state';

@Injectable()
export default class ProjectEffects {
    constructor(private actions$: Actions, private httpService: HttpService, private store$: Store<IProjectState>) {}

    getMainPageData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProjectActions.ProjectActions.GET_INITIAL_PAGE_DATA_REQUEST),
            mergeMap(() => this.httpService.get(WebApiRoutes.ProjectRoutes.GET_MAIN_PAGE_DATA)),
            map((response: any) => {
                const mainPageData: ITeamManagementModel = {
                    project: ProjectEffects.mapToProject(response.project),
                    team: ProjectEffects.mapToTeam(response.team),
                };

                return new ProjectActions.GetProjectMainPageDataSuccess(mainPageData);
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new ProjectActions.GetProjectMainPageDataFailure(error));

                return caught;
            })
        )
    );

    getProjectDesc$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProjectActions.ProjectActions.GET_PROJECT_FULL_DESC_REQUEST),
            mergeMap(() => this.httpService.get(WebApiRoutes.ProjectRoutes.GET_CUSTOMER_PROJECT)),
            map((response) => {
                const fullProjectDescription = ProjectEffects.mapToFullProject(response);

                return new ProjectActions.GetFullProjectSuccess(fullProjectDescription);
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new ProjectActions.GetFullProjectFailure(error));

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

    getSprintsFromEpic$ = createEffect(() =>
        this.actions$.pipe(
            ofType<ProjectActions.GetSprintsFromEpicRequest>(
                ProjectActions.ProjectActions.GET_SPRINTS_FROM_EPIC_REQUEST
            ),
            mergeMap((action) =>
                this.httpService.get(
                    WebApiRoutes.SprintRoutes.GET_EPIC_SPRINTS + `epicId=${action.payload}&includeChildren=false`
                )
            ),
            map((response: any) => {
                const sprints: ISprint[] = response.items.map((s) => ProjectEffects.mapToSprint(s));

                return new ProjectActions.GetSprintsFromEpicSuccess(sprints);
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new ProjectActions.GetSprintsFromEpicFailure(error));

                return caught;
            })
        )
    );

    updateProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType<ProjectActions.UpdateProjectRequest>(ProjectActions.ProjectActions.UPDATE_PROJECT_REQUEST),
            mergeMap((action) => this.httpService.put(WebApiRoutes.ProjectRoutes.UPDATE_PROJECT, action.payload)),
            map((response: any) => {
                const updatedProject: IProject = ProjectEffects.mapToProject(response);

                return new ProjectActions.UpdateProjectSuccess(updatedProject);
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new ProjectActions.UpdateProjectFailure(error));

                return caught;
            })
        )
    );

    updateEpic$ = createEffect(() =>
        this.actions$.pipe(
            ofType<ProjectActions.UpdateEpicRequest>(ProjectActions.ProjectActions.UPDATE_EPIC_REQUEST),
            mergeMap((action) => this.httpService.put(WebApiRoutes.EpicRoutes.UPDATE_EPIC, action.payload)),
            map((response: any) => {
                const updatedEpic: IEpic = ProjectEffects.mapToEpic(response);

                return new ProjectActions.UpdateEpicSuccess(updatedEpic);
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new ProjectActions.UpdateEpicFailure(error));

                return caught;
            })
        )
    );

    updateSprint$ = createEffect(() =>
        this.actions$.pipe(
            ofType<ProjectActions.UpdateSprintRequest>(ProjectActions.ProjectActions.UPDATE_SPRINT_REQUEST),
            mergeMap((action) => this.httpService.put(WebApiRoutes.SprintRoutes.UPDATE_SPRINT, action.payload)),
            map((response: any) => {
                const updatedSprint: ISprint = ProjectEffects.mapToSprint(response);

                return new ProjectActions.UpdateSprintSuccess(updatedSprint);
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new ProjectActions.UpdateSprintFailure(error));

                return caught;
            })
        )
    );

    getBoardData$ = createEffect(() =>
        this.actions$.pipe(
            ofType<ProjectActions.GetProjectBoardDataRequest>(
                ProjectActions.ProjectActions.GET_PROJECT_BOARD_DATA_REQUEST
            ),
            mergeMap((action) => this.httpService.get(WebApiRoutes.ProjectRoutes.GET_BOARD_DATA + action.payload)),
            switchMap((response: any) => {
                const project: IProject = response.project;
                const sprints: ISprint[] = response.epicSprints;
                const team: ITeam = response.team;
                const epics: IEpic[] = response.epics;
                const stories: IStory[] = sprints.reduce((acc, item) => acc.concat(item.stories), []);

                return [
                    new ProjectActions.GetProjectSuccess(project),
                    new ProjectActions.GetEpicsSuccess(epics),
                    new StoryActions.GetStoriesSuccessAction(stories),
                    new TeamActions.GetTeamSuccess(team),
                ];
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new ProjectActions.GetProjectBoardDataFailure(error));

                return caught;
            })
        )
    );

    getFullSprintsFromEpic$ = createEffect(() =>
        this.actions$.pipe(
            ofType<ProjectActions.GetFullSprintsFromEpicRequest>(
                ProjectActions.ProjectActions.GET_FULL_SPRINTS_FROM_EPIC_REQUEST
            ),
            mergeMap((action) =>
                this.httpService.get(
                    WebApiRoutes.SprintRoutes.GET_EPIC_SPRINTS + `epicId=${action.payload}&includeChildren=true`
                )
            ),
            map((response: any) => {
                const epicSprints: ISprint[] = response.map(ProjectEffects.mapToSprint);

                return new ProjectActions.GetFullSprintsFromEpicSuccess(epicSprints);
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new ProjectActions.GetFullSprintsFromEpicFailure(error));

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

    private static mapToTeam = (response: any): ITeam => {
        return {
            teamId: response ? response.teamId : '',
            name: response ? response.name : '',
            location: response ? response.location : '',
            projectId: response ? response.projectId : '',
        } as ITeam;
    };

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
