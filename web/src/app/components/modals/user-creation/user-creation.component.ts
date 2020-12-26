import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalCreationType } from 'src/app/utils/constants';
import BaseModalCreation from '../base-modal-creation';

@Component({
    selector: 'app-user-creation',
    templateUrl: './user-creation.component.html',
    styleUrls: ['./user-creation.component.scss'],
})
export class UserCreationComponent extends BaseModalCreation implements OnInit {
    public formGroup: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) data: ModalCreationType) {
        super(data);
    }

    ngOnInit(): void {}

    public onClickCreate = () => {};
}
