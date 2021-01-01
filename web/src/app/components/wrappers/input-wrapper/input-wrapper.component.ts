import { Component, Input, ViewEncapsulation } from '@angular/core';
import BaseWrapperDirective from '../base-wrapper';

@Component({
    selector: 'app-input-wrapper',
    templateUrl: './input-wrapper.component.html',
    styleUrls: ['./input-wrapper.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class InputWrapperComponent extends BaseWrapperDirective<string> {
    @Input() label: string;
    @Input() required: boolean;
    @Input() type: string;

    public errors: [string, any][] = [];

    constructor() {}

    writeValue(value: any): void {
        this._value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    public get value(): any {
        return this._value;
    }

    @Input()
    public set value(value: any) {
        this._value = value;

        this.onChange(value);
        this.onTouch();
        this.onValidationChanged();
    }

    registerOnValidatorChange(fn: () => void): void {
        this.onValidationChanged = fn;
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (control.errors) {
            this.errors = Object.entries(control.errors);
        } else {
            this.errors = [];
        }

        return control.valid ? null : control.errors;
    }
}
