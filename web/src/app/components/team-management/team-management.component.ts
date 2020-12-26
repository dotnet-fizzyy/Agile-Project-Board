import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ModalCreationType } from 'src/app/utils/constants';
import { ITeam } from 'src/app/utils/interfaces';
import * as TeamSelectors from '../../redux/selectors/team.selectors';
import * as TeamActions from './../../redux/actions/team.actions';
import { ITeamState } from './../../redux/store/state';
import { TeamManageComponent } from './../modals/team-manage/team-manage.component';

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
}
