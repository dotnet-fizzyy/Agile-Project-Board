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
}
