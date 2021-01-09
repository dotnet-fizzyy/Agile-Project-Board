import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IStory } from 'src/app/utils/interfaces';
import * as SidebarActions from '../../redux/actions/sidebar.actions';
import * as StorySelectors from '../../redux/selectors/stories.selectors';
import { ISidebarState } from '../../redux/store/state';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    public storyForm: FormGroup;

    constructor(private store$: Store<ISidebarState>, private fb: FormBuilder) {}

    ngOnInit(): void {
        let story: IStory;
        this.store$.select(StorySelectors.GetSelectedStory).subscribe((x) => (story = x));
        console.log(story);
        this.storyForm = this.fb.group({});
    }

    public onCloseClick = (): void => {
        this.store$.dispatch(new SidebarActions.ChangeSidebarStateAction());
    };
}
