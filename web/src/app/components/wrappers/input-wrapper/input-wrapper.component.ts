import { Component, forwardRef, Input, OnInit } from '@angular/core';
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
export class InputWrapperComponent implements OnInit, ControlValueAccessor {
    private onChange: (value: any) => void;
    private onTouch: () => void;

    private value: any;
    private disabled: boolean;

    @Input() required: boolean;

    constructor() {
        console.log(this.value, this.disabled, this.onChange, this.onTouch);
    }

    ngOnInit(): void {}

    writeValue(outSideValue: any): void {
        this.value = outSideValue;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }
}
