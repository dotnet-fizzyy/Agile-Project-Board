import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IStoreState } from 'src/app/redux/store/state';
import * as ProjectActions from '../../../redux/actions/project.actions';
import * as ProjectSelectors from '../../../redux/selectors/project.selectors';
import { getFormattedDate } from '../../../utils/helpers';
import { IModalData, ISelectItem, ISprint } from '../../../utils/interfaces';

@Component({
    selector: 'app-sprint-creation',
    templateUrl: './sprint-creation.component.html',
    styleUrls: ['./sprint-creation.component.scss'],
})
export class SprintCreationComponent implements OnInit {
    public readonly sprintName: string = 'sprintName';
    public readonly epicId: string = 'epicId';
    public readonly startDate: string = 'startDate';
    public readonly endDate: string = 'endDate';
    public epics: ISelectItem[];

    public formGroup: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) modalData: IModalData,
        private fb: FormBuilder,
        private store$: Store<IStoreState>
    ) {
        this.formGroup = this.fb.group({
            [this.sprintName]: [(modalData.data as ISprint).sprintName, Validators.required],
            [this.startDate]: [getFormattedDate((modalData.data as ISprint).startDate), Validators.required],
            [this.endDate]: [getFormattedDate((modalData.data as ISprint).endDate), Validators.required],
            [this.epicId]: [(modalData.data as ISprint).epicId, Validators.required],
        });
    }

    ngOnInit(): void {
        this.store$.select(ProjectSelectors.getEpicsForSelect).subscribe((x) => (this.epics = x));
    }

    public onClickCreate = (): void => {
        const sprint: ISprint = {
            sprintName: this.formGroup.get(this.sprintName).value,
            startDate: this.formGroup.get(this.startDate).value,
            endDate: this.formGroup.get(this.endDate).value,
            epicId: this.formGroup.get(this.epicId).value,
        };

        this.store$.dispatch(new ProjectActions.CreateSprintRequest(sprint));
    };
}
