import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    profileForm = this.fb.group({
        name: ['', Validators.required],
        password: ['', Validators.required],
    });

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {}

    signIn(): void {
        console.warn(this.profileForm.controls.name, this.profileForm.controls.password);
    }
}
