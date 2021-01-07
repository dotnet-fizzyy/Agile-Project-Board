import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserActions from '../../../redux/actions/user.actions';
import * as ProjectSelectors from '../../../redux/selectors/project.selectors';
import * as UserSelectors from '../../../redux/selectors/users.selectors';
import { IStoreState } from '../../../redux/store/state';
import { UserRoles } from '../../../utils/constants';
import { IProject, IUser } from '../../../utils/interfaces';

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
    public user: IUser;
    public project: IProject;

    constructor(private store$: Store<IStoreState>) {}

    ngOnInit(): void {
        this.store$.select(UserSelectors.GetCurrentUser).subscribe((x) => (this.user = x));
        this.store$.select(ProjectSelectors.getProject).subscribe((x) => (this.project = x));
    }

    public isCustomer = (): boolean => this.user.userRole === UserRoles.Customer;

    public onClickLogOut = (): void => {
        localStorage.removeItem('user');
        this.store$.dispatch(new UserActions.LogOutUser());
    };
}
