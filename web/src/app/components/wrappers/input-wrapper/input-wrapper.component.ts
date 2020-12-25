import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
    ],
})
export class InputWrapperComponent implements ControlValueAccessor {
    private onChange: (value: any) => void;
    private onTouch: () => void;

    private _value: any;

    @Input() label: string;
    @Input() required: boolean;
    @Input() type: string;

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
    }
}
