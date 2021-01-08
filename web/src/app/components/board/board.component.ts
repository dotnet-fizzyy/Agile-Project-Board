import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
    AfterViewInit,
    Component,
    ComponentFactory,
    ComponentFactoryResolver,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ProjectActions from '../../redux/actions/project.actions';
import * as StoryActions from '../../redux/actions/stories.actions';
import * as SidebarSelectors from '../../redux/selectors/sidebar.selectors';
import { IStoreState } from '../../redux/store/state';
import { ColumnNames } from '../../utils/constants';
import { ISelectItem, IStory } from '../../utils/interfaces';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, AfterViewInit {
    private sidebarResolver: ComponentFactory<SidebarComponent>;

    @ViewChild('vf', { read: ViewContainerRef }) vf: ViewContainerRef;
    public columns: ISelectItem[] = [];

    constructor(
        private store$: Store<IStoreState>,
        private route: ActivatedRoute,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    ngOnInit(): void {
        for (const [key, value] of Object.entries(ColumnNames)) {
            this.columns.push({ label: value, value: key } as ISelectItem);
        }

        const projectId = this.route.snapshot.paramMap.get('projectId');

        this.store$.dispatch(new ProjectActions.GetProjectBoardDataRequest(projectId));
        this.store$.select(SidebarSelectors.GetIsOpenedSidebarSelector).subscribe(this.openSidebar);
    }

    ngAfterViewInit(): void {
        this.sidebarResolver = this.componentFactoryResolver.resolveComponentFactory(SidebarComponent);
    }

    public drop(event: CdkDragDrop<ISelectItem[]>): void {
        this.store$.dispatch(
            new StoryActions.ChangeStoryColumnAction({
                storyId: (event.item.data as IStory).storyId,
                storyColumn: event.container.id,
                oldColumn: (event.item.data as IStory).column,
                newColumnIndex: event.currentIndex,
            })
        );
    }

    private openSidebar = (isOpened: boolean): void => {
        if (this.vf && isOpened) {
            this.vf.createComponent(this.sidebarResolver);
        } else if (this.vf && !isOpened) {
            this.vf.clear();
        }
    };
}
