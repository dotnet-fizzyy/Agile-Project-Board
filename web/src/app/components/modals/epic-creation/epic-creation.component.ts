import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IStoreState } from 'src/app/redux/store/state';
import { getFormattedDate } from 'src/app/utils/helpers';
import { IEpic, IModalData } from '../../../utils/interfaces';
import BaseModalCreation from '../base-modal-creation';
import * as ProjectActions from './../../../redux/actions/project.actions';
import * as ProjectSelectors from './../../../redux/selectors/project.selectors';

@Component({
    selector: 'app-epic-creation',
    templateUrl: './epic-creation.component.html',
    styleUrls: ['./epic-creation.component.scss'],
})
export class EpicCreationComponent extends BaseModalCreation implements OnInit {
    private projectId: string;

    public readonly epicName: string = 'epicName';
    public formGroup: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: IModalData,
        private fb: FormBuilder,
        private store$: Store<IStoreState>
    ) {
        super(data.modalType);
    }

    ngOnInit(): void {
        this.store$.select(ProjectSelectors.getProject).subscribe((x) => (this.projectId = x.projectId));

        this.formGroup = this.fb.group({
            [this.epicName]: [(this.data.model as IEpic).epicName, Validators.required],
            [this.startDate]: [getFormattedDate((this.data.model as IEpic).startDate), Validators.required],
            [this.endDate]: [getFormattedDate((this.data.model as IEpic).endDate), Validators.required],
        });
    }

    public onClickCreate = (): void => {
        const epic: IEpic = {
            epicName: this.formGroup.get(this.epicName).value,
            startDate: this.formGroup.get(this.startDate).value,
            endDate: this.formGroup.get(this.endDate).value,
            projectId: this.projectId,
        };

        this.store$.dispatch(new ProjectActions.CreateEpicRequest(epic));
    };
}
