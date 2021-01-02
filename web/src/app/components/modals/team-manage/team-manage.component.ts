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
    private readonly projectId: string = 'projectId';
    public formGroup: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) private modalData: IModalData,
        private fb: FormBuilder,
        private store$: Store<IProjectState>
    ) {}

    ngOnInit(): void {
        let projectId: string;
        this.store$.select(ProjectSelectors.getProject).subscribe((x) => (projectId = x.projectId));

        this.formGroup = this.fb.group({
            [this.teamName]: [(this.modalData.data as ITeam).name, Validators.required],
            [this.location]: [(this.modalData.data as ITeam).location, Validators.required],
            [this.projectId]: [projectId],
        });
    }

    public onClickCreate = () => {
        const team: ITeam = {
            teamId: (this.modalData.data as ITeam).teamId,
            name: this.formGroup.get(this.teamName).value,
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
