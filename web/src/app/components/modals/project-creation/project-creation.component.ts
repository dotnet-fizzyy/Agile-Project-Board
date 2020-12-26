import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ModalCreationType } from 'src/app/utils/constants';
import { getCurrentDate } from 'src/app/utils/helpers';
import { IProject } from 'src/app/utils/interfaces';
import * as ProjectActions from '../../../redux/actions/project.actions';
import { IProjectState } from '../../../redux/store/state';
import BaseModalCreation from '../base-modal-creation';

@Component({
    selector: 'app-project-creation',
    templateUrl: './project-creation.component.html',
    styleUrls: ['./project-creation.component.scss'],
})
export class ProjectCreationComponent extends BaseModalCreation implements OnInit {
    public readonly projectName = 'projectName';

    public formGroup: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) data: ModalCreationType,
        private fb: FormBuilder,
        private store$: Store<IProjectState>
    ) {
        super(data);
    }

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            [this.projectName]: ['', Validators.required],
            [this.startDate]: [getCurrentDate(), Validators.required],
            [this.endDate]: [getCurrentDate(), Validators.required],
        });
    }

    public onClickCreate = (): void => {
        const project: IProject = {
            projectName: this.formGroup.get(this.projectName).value,
            startDate: this.formGroup.get(this.startDate).value,
            endDate: this.formGroup.get(this.endDate).value,
        };

        this.store$.dispatch(new ProjectActions.CreateProjectRequest(project));
    };
}
