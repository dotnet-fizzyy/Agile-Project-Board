import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ModalCreationType } from 'src/app/utils/constants';
import * as TeamActions from '../../../redux/actions/team.actions';
import * as TeamSelectors from '../../../redux/selectors/team.selectors';
import { IProjectState } from '../../../redux/store/state';
import { getUserRolesDropdownItems } from '../../../utils/helpers';
import { IUser } from '../../../utils/interfaces';
import BaseModalCreation from '../base-modal-creation';

@Component({
    selector: 'app-user-creation',
    templateUrl: './user-creation.component.html',
    styleUrls: ['./user-creation.component.scss'],
})
export class UserCreationComponent extends BaseModalCreation implements OnInit {
    public readonly username: string = 'username';
    public readonly password: string = 'password';
    public readonly userRole: string = 'userRole';
    public userRoleOptions = getUserRolesDropdownItems();
    public formGroup: FormGroup;

    private teamId: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) data: ModalCreationType,
        private store$: Store<IProjectState>,
        private fb: FormBuilder
    ) {
        super(data);
    }

    ngOnInit(): void {
        this.store$.select(TeamSelectors.getTeam).subscribe((x) => (this.teamId = x.teamId));

        this.formGroup = this.fb.group({
            [this.username]: [
                '',
                Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
            ],
            [this.password]: ['', Validators.compose([Validators.required])],
            [this.userRole]: ['', Validators.required],
        });
    }

    public onClickCreate = () => {
        const user: IUser = {
            username: this.formGroup.get(this.username).value,
            password: this.formGroup.get(this.password).value,
            userRole: this.formGroup.get(this.userRole).value,
            isActive: true,
            teamId: this.teamId,
        };

        this.store$.dispatch(new TeamActions.CreateTeamMemberRequest(user));
    };
}
