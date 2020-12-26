import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { IProjectState } from 'src/app/redux/store/state';
import { ModalCreationType } from 'src/app/utils/constants';
import * as ProjectActions from '../../../redux/actions/project.actions';
import * as ProjectSelectors from '../../../redux/selectors/project.selectors';
import BaseModalCreation from '../base-modal-creation';
import { getCurrentDate } from './../../../utils/helpers/index';
import { ISelectItem, ISprint } from './../../../utils/interfaces/index';

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
        @Inject(MAT_DIALOG_DATA) data: ModalCreationType,
        private fb: FormBuilder,
        private store$: Store<IProjectState>
    ) {
        super(data);
    }

    ngOnInit(): void {
        this.store$.select(ProjectSelectors.getEpicsForSelect).subscribe((x) => (this.epics = x));

        this.formGroup = this.fb.group({
            [this.sprintName]: ['', Validators.required],
            [this.startDate]: [getCurrentDate(), Validators.required],
            [this.endDate]: [getCurrentDate(), Validators.required],
            [this.epicId]: ['', Validators.required],
        });
    }

    public onClickCreate = (): void => {
        const sprint: ISprint = {
            sprintName: this.formGroup.get(this.sprintName).value,
            startDate: this.formGroup.get(this.startDate).value,
            endDate: this.formGroup.get(this.endDate).value,
            epicId: this.epicId,
        };

        this.store$.dispatch(new ProjectActions.CreateSprintRequest(sprint));
    };
}
