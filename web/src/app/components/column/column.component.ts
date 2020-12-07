import { Component, Input, OnInit } from '@angular/core';
import { ISelectItem, IStory } from '../../utils/interfaces';
import { Store } from '@ngrx/store';
import { IStoreState } from '../../redux/store/state';
import { Observable } from 'rxjs';
import { GetColumnStories } from '../../redux/selectors/stories.selectors';

@Component({
    selector: 'app-column',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
    constructor(private store$: Store<IStoreState>) {}

    @Input() public column: ISelectItem;
    public stories$: Observable<IStory[]>;

    ngOnInit(): void {
        this.stories$ = this.store$.select(GetColumnStories, { columnId: this.column.value });
    }
}
