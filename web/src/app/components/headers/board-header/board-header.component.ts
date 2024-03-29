import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as ProjectActions from '../../../redux/actions/project.actions';
import * as ProjectSelectors from '../../../redux/selectors/project.selectors';
import * as TeamSelectors from '../../../redux/selectors/team.selectors';
import { IStoreState } from '../../../redux/store/state';
import { IProject, ISelectItem } from '../../../utils/interfaces';
import { StoryCreationComponent } from '../../modals/story-creation/story-creation.component';

@Component({
    selector: 'app-board-header',
    templateUrl: './board-header.component.html',
    styleUrls: ['./board-header.component.scss'],
})
export class BoardHeaderComponent implements OnInit {
    public project: IProject;
    public epics: ISelectItem[];
    public selectedEpic: string;
    public teamMembers: ISelectItem[];

    constructor(private store$: Store<IStoreState>, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.store$.select(ProjectSelectors.getProject).subscribe((x) => (this.project = x));
        this.store$.select(ProjectSelectors.getEpicsForSelect).subscribe((x) => (this.epics = x));
        this.store$.select(TeamSelectors.getTeamMembersForSelect).subscribe((x) => (this.teamMembers = x));
    }

    public onChangeEpic = (value: string) => {
        this.selectedEpic = value;
        this.store$.dispatch(new ProjectActions.GetFullSprintsFromEpicRequest(value));
    };

    public onClickAddStory = () => {
        this.dialog.open(StoryCreationComponent, { width: '500px' });
    };
}
