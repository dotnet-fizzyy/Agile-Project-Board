import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ISelectItem, IStory } from 'src/app/utils/interfaces';
import * as SidebarActions from '../../redux/actions/sidebar.actions';
import * as StoryActions from '../../redux/actions/stories.actions';
import * as StorySelectors from '../../redux/selectors/stories.selectors';
import * as TeamSelectors from '../../redux/selectors/team.selectors';
import { ISidebarState } from '../../redux/store/state';
import { BaseRegexExpression, StoryFields } from '../../utils/constants';
import { getStoryColumnsForSelect } from '../../utils/helpers';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    private defaultStory: IStory;
    public storyFields = StoryFields;
    public storyColumns: ISelectItem[];
    public teamMembers: ISelectItem[];
    public storyForm: FormGroup;

    constructor(private store$: Store<ISidebarState>, private fb: FormBuilder) {
        this.storyColumns = getStoryColumnsForSelect();
    }

    ngOnInit(): void {
        this.store$.select(StorySelectors.GetSelectedStory).subscribe((x) => this.storyFormInitializer(x));
        this.store$.select(TeamSelectors.getTeamMembersForSelect).subscribe((x) => (this.teamMembers = x));
    }

    public onCloseClick = (): void => {
        this.store$.dispatch(new SidebarActions.ChangeSidebarState(false));
    };

    private storyFormInitializer(story: IStory): void {
        this.defaultStory = story;
        this.storyForm = this.fb.group({
            [StoryFields.storyId]: [story.storyId],
            [StoryFields.title]: [
                story.title,
                Validators.compose([Validators.required, Validators.pattern(BaseRegexExpression)]),
            ],
            [StoryFields.description]: [
                story.description,
                Validators.compose([Validators.required, Validators.pattern(BaseRegexExpression)]),
            ],
            [StoryFields.estimation]: [
                story.estimation,
                Validators.compose([Validators.required, Validators.min(1), Validators.max(32)]),
            ],
            [StoryFields.userId]: [story.userId ? story.userId : ''],
            [StoryFields.sprintId]: [story.sprintId],
            [StoryFields.column]: [story.column],
            [StoryFields.isReady]: [story.isReady],
            [StoryFields.isBlocked]: [story.isBlocked],
            [StoryFields.blockReason]: [story.blockReason ? story.blockReason : ''],
            [StoryFields.isDefect]: [story.isDefect],
        });
    }

    public onClickReady = (): void => {
        this.storyForm.get(StoryFields.isReady).setValue(true);
        this.storyForm.get(StoryFields.isBlocked).setValue(false);
        this.storyForm.get(StoryFields.blockReason).setValue('');
    };

    public onClickBlock = (): void => {
        this.storyForm.get(StoryFields.isReady).setValue(false);
        this.storyForm.get(StoryFields.isBlocked).setValue(true);
    };

    public onClickUpdateStoryChanges = (): void => {
        const updatedStory: IStory = {
            storyId: this.storyForm.get(StoryFields.storyId).value,
            userId: this.storyForm.get(StoryFields.userId).value,
            sprintId: this.storyForm.get(StoryFields.sprintId).value,
            estimation: Number(this.storyForm.get(StoryFields.estimation).value),
            title: this.storyForm.get(StoryFields.title).value,
            description: this.storyForm.get(StoryFields.description).value,
            isDefect: this.storyForm.get(StoryFields.isDefect).value,
            isBlocked: this.storyForm.get(StoryFields.isBlocked).value,
            blockReason: this.storyForm.get(StoryFields.blockReason).value,
            isReady: this.storyForm.get(StoryFields.isReady).value,
            column: this.storyForm.get(StoryFields.column).value,
        };

        this.store$.dispatch(new StoryActions.UpdateStoryRequest(updatedStory));
    };

    public onClickCancelStoryChanges = (): void => {
        this.storyForm.setValue({
            ...this.defaultStory,
            [StoryFields.userId]: this.defaultStory.userId ? this.defaultStory.userId : '',
            [StoryFields.blockReason]: this.defaultStory.blockReason ? this.defaultStory.blockReason : '',
        });
    };

    public hasStoryValuesChanged = (): boolean =>
        this.defaultStory.estimation !== Number(this.storyForm.get(StoryFields.estimation).value) ||
        this.defaultStory.title !== this.storyForm.get(StoryFields.title).value ||
        this.defaultStory.description !== this.storyForm.get(StoryFields.description).value ||
        this.defaultStory.isBlocked !== this.storyForm.get(StoryFields.isBlocked).value ||
        this.defaultStory.isReady !== this.storyForm.get(StoryFields.isReady).value ||
        (this.defaultStory.userId && this.defaultStory.userId !== this.storyForm.get(StoryFields.userId).value) ||
        this.defaultStory.column !== this.storyForm.get(StoryFields.column).value ||
        (this.defaultStory.blockReason &&
            this.defaultStory.blockReason !== this.storyForm.get(StoryFields.blockReason).value);
}
