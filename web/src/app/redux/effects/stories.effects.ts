import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import { MainRoutes } from '../../utils/constants/webapi-routes';
import { IStory } from '../../utils/interfaces';
import { ChangeSidebarStateAction } from '../actions/sidebar.actions';
import * as StoryActions from '../actions/stories.actions';
import { GetIsOpenedSidebarSelector } from '../selectors/sidebar.selectors';
import { IStoreState } from '../store/state';

@Injectable()
export default class StoriesEffects {
    constructor(private actions$: Actions, private store$: Store<IStoreState>, private httpClient: HttpService) {}

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
                storyId: story.id,
                title: story.title,
                column: story.column,
                isDefect: story.isDefect,
                description: story.description,
                estimation: story.points,
                userId: story.user,
                isBlocked: story.isBlocked,
                isReady: story.isReady,
                blockReason: story.blockReason,
                columnIndex: story.columnIndex,
            } as IStory;
        });
    };
}
