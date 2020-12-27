import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IStoreState } from 'src/app/redux/store/state';
import * as ProjectActions from '../../../redux/actions/project.actions';
import * as ProjectSelectors from '../../../redux/selectors/project.selectors';
import { getFormattedDate } from '../../../utils/helpers';
import { IModalData, ISelectItem, ISprint } from '../../../utils/interfaces';
import BaseModalCreation from '../base-modal-creation';

@Component({
    selector: 'app-sprint-creation',
    templateUrl: './sprint-creation.component.html',
    styleUrls: ['./sprint-creation.component.scss'],
})
export class SprintCreationComponent extends BaseModalCreation implements OnInit {
    public readonly sprintName: string = 'sprintName';
    public readonly epicId: string = 'epicId';
    public epics: ISelectItem[];

    public formGroup: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: IModalData,
        private fb: FormBuilder,
        private store$: Store<IStoreState>
    ) {
        super(data.modalType);
    }

    ngOnInit(): void {
        this.store$.select(ProjectSelectors.getEpicsForSelect).subscribe((x) => (this.epics = x));

        this.formGroup = this.fb.group({
            [this.sprintName]: [(this.data.model as ISprint).sprintName, Validators.required],
            [this.startDate]: [getFormattedDate((this.data.model as ISprint).startDate), Validators.required],
            [this.endDate]: [getFormattedDate((this.data.model as ISprint).endDate), Validators.required],
            [this.epicId]: [(this.data.model as ISprint).epicId, Validators.required],
        });
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
