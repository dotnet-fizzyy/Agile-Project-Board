import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ModalComponentTypes, ModalCreationType } from 'src/app/utils/constants';
import { IModalData, ITeam, IUser } from 'src/app/utils/interfaces';
import * as TeamSelectors from '../../redux/selectors/team.selectors';
import { ITeamState } from '../../redux/store/state';
import * as InitialStates from '../../utils/constants/initialStates';
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
        this.openDialog(TeamManageComponent, {
            modalType: ModalCreationType.Team,
            model: InitialStates.teamInitialState,
        });
    };

    public onClickUpdateTeam = (): void => {
        this.openDialog(TeamManageComponent, {
            modalType: ModalCreationType.Team,
            model: this.team,
        });
    };

    public onClickRemoveTeam = (): void => {};

    public onClickCreateTeamMember = (): void => {
        this.openDialog(UserCreationComponent, {
            modalType: ModalCreationType.User,
            model: InitialStates.teamMemberInitialState,
        });
    };

    public onClickUpdateUser = (teamMember: IUser): void => {
        this.openDialog(UserCreationComponent, {
            modalType: ModalCreationType.User,
            model: teamMember,
        });
    };

    public onClickChangeUserStatus = (userId: string, isActive: boolean): void => {
        const user = this.team.users.find((x) => x.userId === userId);
        user.isActive = !isActive;

        this.store$.dispatch(new TeamActions.UpdateTeamMemberStatusRequest(user));
    };

    private openDialog = (component: ModalComponentTypes, data: IModalData) => {
        this.dialog.open(component, {
            width: '400px',
            data,
        });
    };
}
