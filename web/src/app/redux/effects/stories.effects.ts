import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import * as StoryActions from '../actions/stories.actions';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { IStory } from '../../utils/interfaces';
import { MainRoutes } from '../../utils/constants/routes';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { IStoreState } from '../store/state';
import { ChangeSidebarStateAction } from '../actions/sidebar.actions';
import { GetIsOpenedSidebarSelector } from '../selectors/sidebar.selectors';

@Injectable()
export default class StoriesEffects {
    constructor(private actions$: Actions, private store$: Store<IStoreState>, private httpClient: HttpService) {}

    @Effect({ dispatch: false })
    storiesRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StoryActions.StoryActions.GET_STORIES_REQUEST),
            mergeMap(() => this.httpClient.get(MainRoutes.STORIES)),
            map((response) => {
                const mappedStories = this.mapToStories(response);

                return new StoryActions.GetStoriesSuccessAction(mappedStories);
            }),
            catchError(() => of(new StoryActions.GetStoriesRequestAction()))
        )
    );

    @Effect({ dispatch: false })
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

    private mapToStories = (response: any): IStory[] => {
        return response.map((story) => {
            return {
                id: story.id,
                title: story.title,
                column: story.column,
                isDefect: story.isDefect,
                description: story.description,
                points: story.points,
                user: story.user,
                isBlocked: story.isBlocked,
                isReady: story.isReady,
                blockReason: story.blockReason,
                columnIndex: story.columnIndex,
            } as IStory;
        });
    };
}
