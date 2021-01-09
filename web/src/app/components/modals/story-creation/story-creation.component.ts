import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as StoryActions from '../../../redux/actions/stories.actions';
import * as ProjectSelectors from '../../../redux/selectors/project.selectors';
import * as TeamSelectors from '../../../redux/selectors/team.selectors';
import { IStoreState } from '../../../redux/store/state';
import { ColumnIds, StoryFields } from '../../../utils/constants';
import { ISelectItem, IStory } from '../../../utils/interfaces';

@Component({
    selector: 'app-story-creation',
    templateUrl: './story-creation.component.html',
    styleUrls: ['./story-creation.component.scss'],
})
export class StoryCreationComponent implements OnInit {
    public sprints: ISelectItem[];
    public users: ISelectItem[];
    public storyForm: FormGroup;

    constructor(private store$: Store<IStoreState>, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.store$.select(ProjectSelectors.getSprintsForSelect).subscribe((x) => (this.sprints = x));
        this.store$.select(TeamSelectors.getTeamMembersForSelect).subscribe((x) => (this.users = x));

        this.storyForm = this.fb.group({
            [StoryFields.title]: ['', Validators.required],
            [StoryFields.sprintId]: [null, Validators.required],
            [StoryFields.estimation]: [
                0,
                Validators.compose([Validators.required, Validators.min(1), Validators.max(32)]),
            ],
            [StoryFields.column]: [ColumnIds.IDEA],
            [StoryFields.description]: ['', Validators.required],
            [StoryFields.isDefect]: [false],
            [StoryFields.userId]: [null],
        });
    }

    public onClickCreateStory = () => {
        const story: IStory = {
            title: this.storyForm.get(StoryFields.title).value,
            description: this.storyForm.get(StoryFields.description).value,
            isDefect: this.storyForm.get(StoryFields.isDefect).value,
            column: this.storyForm.get(StoryFields.column).value,
            userId: this.storyForm.get(StoryFields.userId).value,
            sprintId: this.storyForm.get(StoryFields.sprintId).value,
            estimation: Number(this.storyForm.get(StoryFields.estimation).value),
        };

        this.store$.dispatch(new StoryActions.CreateStoryRequestAction(story));
    };
}
