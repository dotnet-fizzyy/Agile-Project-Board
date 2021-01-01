import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IProjectState } from 'src/app/redux/store/state';
import { ModalType } from 'src/app/utils/constants';
import * as TeamActions from '../../../redux/actions/team.actions';
import * as ProjectSelectors from '../../../redux/selectors/project.selectors';
import { IModalData, ITeam } from '../../../utils/interfaces';

@Component({
    selector: 'app-team-manage',
    templateUrl: './team-manage.component.html',
    styleUrls: ['./team-manage.component.scss'],
})
export class TeamManageComponent implements OnInit {
    public readonly teamName: string = 'teamName';
    public readonly location: string = 'location';
    public formGroup: FormGroup;

    private projectId: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) private modalData: IModalData,
        private fb: FormBuilder,
        private store$: Store<IProjectState>
    ) {
        this.formGroup = this.fb.group({
            [this.teamName]: [(modalData.data as ITeam).teamName, Validators.required],
            [this.location]: [(modalData.data as ITeam).location, Validators.required],
        });
    }

    ngOnInit(): void {
        this.store$.select(ProjectSelectors.getProject).subscribe((x) => (this.projectId = x.projectId));
    }

    public onClickCreate = () => {
        const team: ITeam = {
            teamId: (this.modalData.data as ITeam).teamId,
            teamName: this.formGroup.get(this.teamName).value,
            location: this.formGroup.get(this.location).value,
            projectId: this.formGroup.get(this.projectId).value,
        };

        if (this.modalData.type === ModalType.CREATE) {
            this.store$.dispatch(new TeamActions.CreateTeamRequest(team));
        } else {
            this.store$.dispatch(new TeamActions.UpdateTeamRequest(team));
        }
    };
}
