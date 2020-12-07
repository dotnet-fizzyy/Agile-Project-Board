import { Component, Input, OnInit } from '@angular/core';
import { IStory } from '../../utils/interfaces';
import { Store } from '@ngrx/store';
import { ISidebarState } from '../../redux/store/state';
import { ViewStoryDetailsAction } from '../../redux/actions/stories.actions';

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
        this.store$.dispatch(new ViewStoryDetailsAction(this.story.id));
    };
}
