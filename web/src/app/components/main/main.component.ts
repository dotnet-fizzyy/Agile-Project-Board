import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IStoreState } from '../../redux/store/state';
import { ISelectItem, IUser } from '../../utils/interfaces';
import { GetUsersSelector } from './../../redux/selectors/users.selectors';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
    public columns: ISelectItem[] = [];
    public currentUser$: Observable<IUser[]> = this.store$.select(GetUsersSelector);

    constructor(private store$: Store<IStoreState>) {}

    ngOnInit(): void {}
}
