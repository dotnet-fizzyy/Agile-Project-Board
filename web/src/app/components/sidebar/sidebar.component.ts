import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ISidebarState } from '../../redux/store/state';
import { ChangeSidebarStateAction } from '../../redux/actions/sidebar.actions';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    constructor(private store$: Store<ISidebarState>) {}

    ngOnInit(): void {}

    onCloseSidebar = () => {
        this.store$.dispatch(new ChangeSidebarStateAction());
    };
}
