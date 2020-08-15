import { Injectable } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import * as StoryActions from '../actions/stories.actions';
import {catchError, map, mergeMap} from "rxjs/operators";
import { IStory } from "../../utils/interfaces";
import { Routes } from '../../utils/constants/routes';
import { of } from "rxjs";

@Injectable()
export class StoriesEffects {
  constructor(private actions$: Actions, private httpClient: HttpService) { }

  @Effect({ dispatch: false })
  storiesRequest$ = createEffect(() => this.actions$.pipe(
    ofType(StoryActions.StoryActions.GET_STORIES_REQUEST),
    mergeMap(() => this.httpClient.get(Routes.STORIES)),
    map(response => {
      const mappedStories = this.mapToStories(response);

      return new StoryActions.GetStoriesSuccessAction(mappedStories);
    }),
    catchError(() => of(new StoryActions.GetStoriesRequestAction())),
  ));

  private mapToStories = (response: any): IStory[] => {
    return response.map(story => {
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
      } as IStory
    });
  }
}
