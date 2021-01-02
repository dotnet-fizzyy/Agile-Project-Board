import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ModalComponentTypes, ModalType } from 'src/app/utils/constants';
import { IModalData, ITeam, IUser } from 'src/app/utils/interfaces';
import * as LoaderSelectors from '../../redux/selectors/loader.selectors';
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
    public isLoading: boolean;

    constructor(private store$: Store<ITeamState>, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.store$.dispatch(new TeamActions.GetTeamRequest());

        this.store$.select(TeamSelectors.getTeam).subscribe((x) => (this.team = x));
        this.store$.select(LoaderSelectors.getIsLoading).subscribe((x) => (this.isLoading = x));
    }

    public onClickCreateTeam = (): void => {
        this.openDialog(TeamManageComponent, {
            type: ModalType.CREATE,
            data: InitialStates.teamInitialState,
        });
    };

    public onClickUpdateTeam = (): void => {
        this.openDialog(TeamManageComponent, {
            type: ModalType.UPDATE,
            data: this.team,
        });
    };

    public onClickRemoveTeam = (): void => {};

    public onClickCreateTeamMember = (): void => {
        this.openDialog(UserCreationComponent, {
            type: ModalType.CREATE,
            data: InitialStates.teamMemberInitialState,
        });
    };

    public onClickUpdateUser = (teamMember: IUser): void => {
        this.openDialog(UserCreationComponent, {
            type: ModalType.UPDATE,
            data: teamMember,
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
