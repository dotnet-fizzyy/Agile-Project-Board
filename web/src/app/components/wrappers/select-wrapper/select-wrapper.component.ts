import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ISelectItem } from './../../../utils/interfaces/index';

@Component({
    selector: 'app-select-wrapper',
    templateUrl: './select-wrapper.component.html',
    styleUrls: ['./select-wrapper.component.scss'],
})
export class SelectWrapperComponent implements OnInit, ControlValueAccessor {
    private onChange: (value: any) => void;
    private onTouch: () => void;

    private _selectedValue: ISelectItem;

    @Input() label: string;
    @Input() options: ISelectItem[];

    constructor() {}

    ngOnInit(): void {}

    writeValue(selectedItem: ISelectItem): void {
        this._selectedValue = selectedItem;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    public get selectedItem(): ISelectItem {
        return this._selectedValue;
    }

    @Input()
    public set selectedItem(selectedItem: ISelectItem) {
        this._selectedValue = selectedItem;
        this.onChange(selectedItem);
        this.onTouch();
    }
}
