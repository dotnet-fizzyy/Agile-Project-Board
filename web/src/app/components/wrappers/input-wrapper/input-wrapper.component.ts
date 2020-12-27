import { Component, forwardRef, Input } from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator,
} from '@angular/forms';

@Component({
    selector: 'app-input-wrapper',
    templateUrl: './input-wrapper.component.html',
    styleUrls: ['./input-wrapper.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputWrapperComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => InputWrapperComponent),
            multi: true,
        },
    ],
})
export class InputWrapperComponent implements ControlValueAccessor, Validator {
    private onChange: (value: any) => void;
    private onTouch: () => void;
    private onValidationChanged: () => void;

    private _value: any;

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
        if (control.touched && control.errors) {
            this.errors = Object.entries(control.errors);
        } else {
            this.errors = [];
        }

        return control.valid ? null : control.errors;
    }
}
