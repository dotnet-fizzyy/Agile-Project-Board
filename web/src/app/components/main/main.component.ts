import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ProjectSelectors from '../../redux/selectors/project.selectors';
import * as TeamSelectors from '../../redux/selectors/team.selectors';
import * as UserSelectors from '../../redux/selectors/users.selectors';
import { IStoreState } from '../../redux/store/state';
import { IProject, ITeam, IUser } from '../../utils/interfaces';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
    public currentUser: IUser;
    public project: IProject;
    public team: ITeam;

    constructor(private store$: Store<IStoreState>, private router: Router) {}

    public onClickViewBoard = (): void => {
        this.router.navigate([`/board/${this.project.projectId}`]);
    };

    public onClickViewProjectSettings = (): void => {
        this.router.navigate(['/project']);
    };

    ngOnInit(): void {
        this.store$.select(UserSelectors.GetCurrentUser).subscribe((x) => (this.currentUser = x));
        this.store$.select(ProjectSelectors.getProject).subscribe((x) => (this.project = x));
        this.store$.select(TeamSelectors.getTeam).subscribe((x) => (this.team = x));
    }
}
