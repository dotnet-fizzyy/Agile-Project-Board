import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChangeStoryColumnAction, GetStoriesRequestAction } from '../../redux/actions/stories.actions';
import { GetUsersRequestAction } from '../../redux/actions/user.actions';
import { GetIsOpenedSidebarSelector } from '../../redux/selectors/sidebar.selectors';
import { IStoreState } from '../../redux/store/state';
import { ColumnNames } from '../../utils/constants';
import { ISelectItem, IStory } from '../../utils/interfaces';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
    public columns: ISelectItem[] = [];
    public opened$: Observable<boolean> = this.store$.select(GetIsOpenedSidebarSelector);

    constructor(private store$: Store<IStoreState>) {}

    ngOnInit(): void {
        for (const [key, value] of Object.entries(ColumnNames)) {
            this.columns.push({ label: value, value: key } as ISelectItem);
        }

        this.store$.dispatch(new GetUsersRequestAction());
        this.store$.dispatch(new GetStoriesRequestAction());
    }

    public drop(event: CdkDragDrop<ISelectItem[]>): void {
        this.store$.dispatch(
            new ChangeStoryColumnAction({
                storyId: (event.item.data as IStory).id,
                storyColumn: event.container.id,
                oldColumn: (event.item.data as IStory).column,
                newColumnIndex: event.currentIndex,
            })
        );
    }
}
