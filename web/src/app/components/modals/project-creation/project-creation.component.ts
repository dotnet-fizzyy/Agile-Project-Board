import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ModalType } from 'src/app/utils/constants';
import { getFormattedDate } from 'src/app/utils/helpers';
import { IModalData, IProject } from 'src/app/utils/interfaces';
import * as ProjectActions from '../../../redux/actions/project.actions';
import * as UserSelectors from '../../../redux/selectors/users.selectors';
import { IStoreState } from '../../../redux/store/state';

@Component({
    selector: 'app-project-creation',
    templateUrl: './project-creation.component.html',
    styleUrls: ['./project-creation.component.scss'],
})
export class ProjectCreationComponent implements OnInit {
    private readonly customerId: string = 'customerId';
    public readonly projectName: string = 'projectName';
    public readonly startDate: string = 'startDate';
    public readonly endDate: string = 'endDate';
    public isCreation: boolean;

    public formGroup: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) private modalData: IModalData,
        private fb: FormBuilder,
        private store$: Store<IStoreState>
    ) {}

    ngOnInit(): void {
        let customerId: string;
        this.store$.select(UserSelectors.GetCurrentUser).subscribe((x) => (customerId = x.userId));

        this.isCreation = this.modalData.type === ModalType.CREATE;
        this.formGroup = this.fb.group({
            [this.projectName]: [(this.modalData.data as IProject).projectName, Validators.required],
            [this.startDate]: [getFormattedDate((this.modalData.data as IProject).startDate), Validators.required],
            [this.endDate]: [getFormattedDate((this.modalData.data as IProject).endDate), Validators.required],
            [this.customerId]: [customerId],
        });
    }

    public onClickCreate = (): void => {
        const project: IProject = {
            projectId: (this.modalData.data as IProject).projectId,
            projectName: this.formGroup.get(this.projectName).value,
            startDate: this.formGroup.get(this.startDate).value,
            endDate: this.formGroup.get(this.endDate).value,
            customerId: this.formGroup.get(this.customerId).value,
        };

        if (this.isCreation) {
            this.store$.dispatch(new ProjectActions.CreateProjectRequest(project));
        } else {
            this.store$.dispatch(new ProjectActions.UpdateProjectRequest(project));
        }
    };
}
