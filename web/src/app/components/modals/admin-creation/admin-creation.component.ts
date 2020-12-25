import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ModalCreationType } from 'src/app/utils/constants';
import { IProjectState } from '../../../redux/store/state';
import BaseModalCreation from './base-modal-creation';

@Component({
    selector: 'app-project-creation',
    templateUrl: './admin-creation.component.html',
    styleUrls: ['./admin-creation.component.scss'],
})
export class AdminCreationComponent extends BaseModalCreation {
    constructor(@Inject(MAT_DIALOG_DATA) data: ModalCreationType, fb: FormBuilder, store$: Store<IProjectState>) {
        super(data, fb, store$);
    }
}
