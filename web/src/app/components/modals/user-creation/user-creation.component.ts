import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ModalType } from 'src/app/utils/constants';
import * as TeamActions from '../../../redux/actions/team.actions';
import * as TeamSelectors from '../../../redux/selectors/team.selectors';
import { IStoreState } from '../../../redux/store/state';
import { getUserRolesDropdownItems } from '../../../utils/helpers';
import { IModalData, ISelectItem, IUser } from '../../../utils/interfaces';

@Component({
    selector: 'app-user-creation',
    templateUrl: './user-creation.component.html',
    styleUrls: ['./user-creation.component.scss'],
})
export class UserCreationComponent implements OnInit {
    public readonly username: string = 'username';
    public readonly password: string = 'password';
    public readonly userRole: string = 'userRole';
    private readonly teamId: string = 'teamId';
    public userRoleOptions: ISelectItem[] = getUserRolesDropdownItems();
    public formGroup: FormGroup;
    public isCreation: boolean;

    constructor(
        @Inject(MAT_DIALOG_DATA) private modalData: IModalData,
        private store$: Store<IStoreState>,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        let teamId: string;
        this.store$.select(TeamSelectors.getTeam).subscribe((x) => (teamId = x.teamId));

        this.isCreation = this.modalData.type === ModalType.CREATE;
        this.formGroup = this.fb.group({
            [this.username]: [
                (this.modalData.data as IUser).username,
                Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
            ],
            [this.password]: this.isCreation ? ['', Validators.compose([Validators.required])] : [''],
            [this.userRole]: [(this.modalData.data as IUser).userRole, Validators.required],
            [this.teamId]: [teamId],
        });
    }

    public onClickCreate = () => {
        const user: IUser = {
            userId: (this.modalData.data as IUser).userId,
            username: this.formGroup.get(this.username).value,
            password: this.formGroup.get(this.password).value,
            userRole: this.formGroup.get(this.userRole).value,
            isActive: true,
            teamId: this.formGroup.get(this.teamId).value,
        };

        if (this.modalData.type === ModalType.CREATE) {
            this.store$.dispatch(new TeamActions.CreateTeamMemberRequest(user));
        } else {
            this.store$.dispatch(new TeamActions.UpdateTeamMemberRequest(user));
        }
    };
}
