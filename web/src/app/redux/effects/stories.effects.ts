import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import * as WebApiRoutes from '../../utils/constants/webapi-routes';
import { IStory } from '../../utils/interfaces';
import { ChangeSidebarStateAction } from '../actions/sidebar.actions';
import * as StoryActions from '../actions/stories.actions';
import { GetIsOpenedSidebarSelector } from '../selectors/sidebar.selectors';
import { IStoreState } from '../store/state';

@Injectable()
export default class StoriesEffects {
    constructor(private actions$: Actions, private store$: Store<IStoreState>, private httpClient: HttpService) {}

    viewDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StoryActions.StoryActions.VIEW_STORY_DETAILS),
            withLatestFrom(this.store$.select(GetIsOpenedSidebarSelector)),
            map(([action, isOpened]) => {
                if (!isOpened) {
                    return new ChangeSidebarStateAction();
                }
            })
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

    private static mapToStory = (response: any): IStory => {
        return {
            storyId: response.storyId,
            title: response.title,
            column: response.column,
            isDefect: response.isDefect,
            description: response.description,
            estimation: response.points,
            userId: response.userId,
            isBlocked: response.isBlocked,
            isReady: response.isReady,
            blockReason: response.blockReason,
        } as IStory;
    };
}
