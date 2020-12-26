import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ModalCreationType } from 'src/app/utils/constants';
import { ITeam } from 'src/app/utils/interfaces';
import * as TeamSelectors from '../../redux/selectors/team.selectors';
import { ITeamState } from '../../redux/store/state';
import { TeamManageComponent } from '../modals/team-manage/team-manage.component';
import { UserCreationComponent } from '../modals/user-creation/user-creation.component';
import * as TeamActions from './../../redux/actions/team.actions';

@Component({
    selector: 'app-team-management',
    templateUrl: './team-management.component.html',
    styleUrls: ['./team-management.component.scss'],
})
export class TeamManagementComponent implements OnInit {
    public team: ITeam;

    constructor(private store$: Store<ITeamState>, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.store$.dispatch(new TeamActions.GetTeamRequest());

        this.store$.select(TeamSelectors.getTeam).subscribe((x) => (this.team = x));
    }

    public onClickCreateTeam = (): void => {
        this.dialog.open(TeamManageComponent, { width: '400px', data: ModalCreationType.Team });
    };

    public onClickUpdateTeam = (): void => {};

    public onClickRemoveTeam = (): void => {};

    public onClickCreateTeamMember = (): void => {
        this.dialog.open(UserCreationComponent, { width: '400px', data: ModalCreationType.User });
    };

    public onClickUpdateUser = (): void => {};

    public onClickChangeUserStatus = (userId: string, isActive: boolean): void => {
        const user = this.team.users.find((x) => x.userId === userId);
        user.isActive = !isActive;

        this.store$.dispatch(new TeamActions.UpdateTeamMemberStatusRequest(user));
    };
}
