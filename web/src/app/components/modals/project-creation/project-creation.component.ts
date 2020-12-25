import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ProjectActions from 'src/app/redux/actions/project.actions';
import { IProjectState } from './../../../redux/store/state';
import { IProject } from './../../../utils/interfaces/index';

@Component({
    selector: 'app-project-creation',
    templateUrl: './project-creation.component.html',
    styleUrls: ['./project-creation.component.scss'],
})
export class ProjectCreationComponent implements OnInit {
    readonly projectName = 'projectName';
    readonly startDate = 'startDate';
    readonly endDate = 'endDate';

    projectForm: FormGroup;

    constructor(private fb: FormBuilder, private store$: Store<IProjectState>) {}

    ngOnInit(): void {
        this.projectForm = this.fb.group({
            [this.projectName]: ['', Validators.required],
            [this.startDate]: ['', Validators.required],
            [this.endDate]: ['', Validators.required],
        });
    }

    onClickCreateProject = (): void => {
        const project: IProject = {
            projectName: this.projectForm.get(this.projectName).value,
            startDate: this.projectForm.get(this.startDate).value,
            endDate: this.projectForm.get(this.endDate).value,
        };

        this.store$.dispatch(new ProjectActions.CreateProjectRequest(project));
    };
}
