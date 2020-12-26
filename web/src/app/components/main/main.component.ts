import { Component, OnInit } from '@angular/core';
import { ISelectItem } from '../../utils/interfaces';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
    public columns: ISelectItem[] = [];
    // public currentUser$: Observable<IUser[]> = this.store$.select(GetUsersSelector);

    constructor() {}

    ngOnInit(): void {}
}
