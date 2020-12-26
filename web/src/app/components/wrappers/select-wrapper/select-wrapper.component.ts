import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISelectItem } from './../../../utils/interfaces/index';

@Component({
    selector: 'app-select-wrapper',
    templateUrl: './select-wrapper.component.html',
    styleUrls: ['./select-wrapper.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectWrapperComponent),
            multi: true,
        },
    ],
})
export class SelectWrapperComponent implements OnInit, ControlValueAccessor {
    private onChange: (value: string) => void;
    private onTouch: () => void;

    private _selectedValue: string;

    @Input() label: string;
    @Input() options: ISelectItem[];

    constructor() {}

    ngOnInit(): void {}

    writeValue(selectedItem: string): void {
        this._selectedValue = selectedItem;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    public get value(): string {
        return this._selectedValue;
    }

    @Input()
    public set value(selectedItem: string) {
        this._selectedValue = selectedItem;
        this.onChange(selectedItem);
        this.onTouch();
    }
}
