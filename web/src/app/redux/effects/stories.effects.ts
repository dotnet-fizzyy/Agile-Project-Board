import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import * as WebApiRoutes from '../../utils/constants/webapi-routes';
import { IStory, IUpdateStoryColumn } from '../../utils/interfaces';
import * as SidebarActions from '../actions/sidebar.actions';
import * as StoryActions from '../actions/stories.actions';
import { IStoreState } from '../store/state';

@Injectable()
export default class StoriesEffects {
    constructor(private actions$: Actions, private store$: Store<IStoreState>, private httpClient: HttpService) {}

    viewDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StoryActions.StoryActions.VIEW_STORY_DETAILS),
            map(() => new SidebarActions.ChangeSidebarState(true))
        )
    );

    createStory$ = createEffect(() =>
        this.actions$.pipe(
            ofType<StoryActions.CreateStoryRequestAction>(StoryActions.StoryActions.CREATE_STORY_REQUEST),
            mergeMap((action) => this.httpClient.post(WebApiRoutes.MainRoutes.STORIES, action.payload)),
            map((response) => {
                const story: IStory = StoriesEffects.mapToStory(response);

                return new StoryActions.CreateStorySuccessAction(story);
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new StoryActions.CreateStoryFailureAction(error));

                return caught;
            })
        )
    );

    changeStoryColumn$ = createEffect(() =>
        this.actions$.pipe(
            ofType<StoryActions.ChangeStoryColumnAction>(StoryActions.StoryActions.CHANGE_STORY_COLUMN),
            mergeMap((action) => {
                const updateStoryColumn: IUpdateStoryColumn = {
                    storyId: action.payload.storyId,
                    column: action.payload.storyColumn,
                };

                return this.httpClient.put(WebApiRoutes.StoryRoutes.CHANGE_STORY_COLUMN, updateStoryColumn);
            }),
            map((response) => {
                return new StoryActions.ChangeStoryColumnSuccess();
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new StoryActions.ChangeStoryColumnFailure(error));

                return caught;
            })
        )
    );

    updateStory$ = createEffect(() =>
        this.actions$.pipe(
            ofType<StoryActions.UpdateStoryRequest>(StoryActions.StoryActions.UPDATE_STORY_REQUEST),
            mergeMap((action) => this.httpClient.put(WebApiRoutes.MainRoutes.STORIES, action.payload)),
            map((response: any) => {
                const mappedStory = StoriesEffects.mapToStory(response);

                return new StoryActions.UpdateStorySuccess(mappedStory);
            }),
            catchError((error, caught) => {
                this.store$.dispatch(new StoryActions.UpdateStoryFailure(error));

                return caught;
            })
        )
    );

    private static mapToStory = (response: any): IStory => {
        return {
            storyId: response.storyId,
            title: response.title,
            column: response.column,
            isDefect: response.isDefect,
            description: response.description,
            estimation: response.estimation,
            userId: response.userId,
            isBlocked: response.isBlocked,
            isReady: response.isReady,
            blockReason: response.blockReason,
        } as IStory;
    };
}
