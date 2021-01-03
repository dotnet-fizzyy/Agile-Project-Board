import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IStoreState } from 'src/app/redux/store/state';
import { ModalType } from 'src/app/utils/constants';
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
    private readonly sprintId: string = 'sprintId';
    public readonly sprintName: string = 'sprintName';
    public readonly epicId: string = 'epicId';
    public readonly startDate: string = 'startDate';
    public readonly endDate: string = 'endDate';
    public isCreation: boolean;
    public epics: ISelectItem[];

    public formGroup: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) private modalData: IModalData,
        private fb: FormBuilder,
        private store$: Store<IStoreState>
    ) {}

    ngOnInit(): void {
        this.store$.select(ProjectSelectors.getEpicsForSelect).subscribe((x) => (this.epics = x));

        this.isCreation = this.modalData.type === ModalType.CREATE;
        this.formGroup = this.fb.group({
            [this.sprintId]: [(this.modalData.data as ISprint).sprintId],
            [this.sprintName]: [(this.modalData.data as ISprint).sprintName, Validators.required],
            [this.startDate]: [getFormattedDate((this.modalData.data as ISprint).startDate), Validators.required],
            [this.endDate]: [getFormattedDate((this.modalData.data as ISprint).endDate), Validators.required],
            [this.epicId]: [(this.modalData.data as ISprint).epicId, Validators.required],
        });
    }

    public onClickCreate = (): void => {
        const sprint: ISprint = {
            sprintId: this.formGroup.get(this.sprintId).value,
            sprintName: this.formGroup.get(this.sprintName).value,
            startDate: this.formGroup.get(this.startDate).value,
            endDate: this.formGroup.get(this.endDate).value,
            epicId: this.formGroup.get(this.epicId).value,
        };

        if (this.isCreation) {
            this.store$.dispatch(new ProjectActions.CreateSprintRequest(sprint));
        } else {
            this.store$.dispatch(new ProjectActions.UpdateSprintRequest(sprint));
        }
    };
}
