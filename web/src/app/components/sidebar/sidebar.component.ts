import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as SidebarActions from '../../redux/actions/sidebar.actions';
import { ISidebarState } from '../../redux/store/state';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    constructor(private store$: Store<ISidebarState>) {}

    ngOnInit(): void {}

    public onCloseClick = (): void => {
        this.store$.dispatch(new SidebarActions.ChangeSidebarStateAction());
    };
}
