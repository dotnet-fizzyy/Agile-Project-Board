import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IStoreState } from 'src/app/redux/store/state';
import { ModalType } from 'src/app/utils/constants';
import { getFormattedDate } from 'src/app/utils/helpers';
import { IEpic, IModalData } from '../../../utils/interfaces';
import * as ProjectActions from './../../../redux/actions/project.actions';
import * as ProjectSelectors from './../../../redux/selectors/project.selectors';

@Component({
    selector: 'app-epic-creation',
    templateUrl: './epic-creation.component.html',
    styleUrls: ['./epic-creation.component.scss'],
})
export class EpicCreationComponent implements OnInit {
    private readonly epicId: string = 'epicId';
    private readonly projectId: string = 'projectId';
    public readonly epicName: string = 'epicName';
    public readonly startDate: string = 'startDate';
    public readonly endDate: string = 'endDate';
    public formGroup: FormGroup;
    public isCreation: boolean;

    constructor(
        @Inject(MAT_DIALOG_DATA) private modalData: IModalData,
        private fb: FormBuilder,
        private store$: Store<IStoreState>
    ) {}

    ngOnInit(): void {
        let projectId: string;
        this.store$.select(ProjectSelectors.getProject).subscribe((x) => (projectId = x.projectId));

        this.isCreation = this.modalData.type === ModalType.CREATE;
        this.formGroup = this.fb.group({
            [this.epicId]: [(this.modalData.data as IEpic).epicId],
            [this.epicName]: [(this.modalData.data as IEpic).epicName, Validators.required],
            [this.startDate]: [getFormattedDate((this.modalData.data as IEpic).startDate), Validators.required],
            [this.endDate]: [getFormattedDate((this.modalData.data as IEpic).endDate), Validators.required],
            [this.projectId]: [projectId],
        });
    }

    public onClickCreate = (): void => {
        const epic: IEpic = {
            epicId: this.formGroup.get(this.epicId).value,
            epicName: this.formGroup.get(this.epicName).value,
            startDate: this.formGroup.get(this.startDate).value,
            endDate: this.formGroup.get(this.endDate).value,
            projectId: this.formGroup.get(this.projectId).value,
        };

        if (this.isCreation) {
            this.store$.dispatch(new ProjectActions.CreateEpicRequest(epic));
        } else {
            this.store$.dispatch(new ProjectActions.UpdateEpicRequest(epic));
        }
    };
}
