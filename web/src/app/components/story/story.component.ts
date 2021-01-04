import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ViewStoryDetailsAction } from '../../redux/actions/stories.actions';
import { ISidebarState } from '../../redux/store/state';
import { IStory } from '../../utils/interfaces';

@Component({
    selector: 'app-story',
    templateUrl: './story.component.html',
    styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {
    @Input() public story: IStory;

    constructor(private store$: Store<ISidebarState>) {}

    ngOnInit(): void {}

    onClick = () => {
        this.store$.dispatch(new ViewStoryDetailsAction(this.story.storyId));
    };
}
