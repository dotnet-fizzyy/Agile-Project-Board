import { Directive, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { IValidationMessage } from '../../utils/interfaces';

export const ValidationMessage: { [key: string]: (message: IValidationMessage) => string } = {
    required: () => 'This field is required',
    maxlength: (message) => `The max length of this field is ${message.length} symbols`,
    minlength: (message) => `The min length of this field is ${message.length} symbols`,
    max: (message) => `The maximum value is ${message.maxValue}`,
    min: (message) => `The minimum value is ${message.minValue}`,
    pattern: () => 'The field is invalid',
};

@Directive()
export default abstract class BaseWrapperDirective<T> implements ControlValueAccessor {
    private onChange: (value: T) => void;
    private onTouch: () => void;

    private _value: T;

    @Input() disabled: boolean;

    public get value(): T {
        return this._value;
    }

    @Input()
    public set value(value: T) {
        this._value = value;

        this.onChange(value);
        this.onTouch();
    }

    public get showError(): boolean {
        return this.control.invalid;
    }

    public get error(): string {
        if (!this.control && !this.control.errors) {
            return null;
        }

        const errors = Object.entries(this.control.errors);
        if (!errors.length) {
            return null;
        }

        const mainError = errors[0];

        const requirements: IValidationMessage = {
            length: mainError[1].requiredLength,
            minValue: mainError[1].min,
            maxValue: mainError[1].max,
        };

        return ValidationMessage[mainError[0]](requirements);
    }

    constructor(@Self() @Optional() private control: NgControl) {
        this.control.valueAccessor = this;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    writeValue(value: T): void {
        this._value = value;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
