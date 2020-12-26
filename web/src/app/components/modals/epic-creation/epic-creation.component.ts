import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IProjectState } from 'src/app/redux/store/state';
import { ModalCreationType } from 'src/app/utils/constants';
import { getCurrentDate } from 'src/app/utils/helpers';
import BaseModalCreation from '../base-modal-creation';
import * as ProjectActions from './../../../redux/actions/project.actions';
import * as ProjectSelectors from './../../../redux/selectors/project.selectors';
import { IEpic } from './../../../utils/interfaces/index';

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
        @Inject(MAT_DIALOG_DATA) data: ModalCreationType,
        private fb: FormBuilder,
        private store$: Store<IProjectState>
    ) {
        super(data);
    }

    ngOnInit(): void {
        this.store$.select(ProjectSelectors.getProject).subscribe((x) => (this.projectId = x.projectId));

        this.formGroup = this.fb.group({
            [this.epicName]: ['', Validators.required],
            [this.startDate]: [getCurrentDate(), Validators.required],
            [this.endDate]: [getCurrentDate(), Validators.required],
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
