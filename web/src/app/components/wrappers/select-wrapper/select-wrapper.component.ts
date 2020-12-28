import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ISelectItem } from '../../../utils/interfaces';
import BaseWrapperDirective from '../base-wrapper';

@Component({
    selector: 'app-select-wrapper',
    templateUrl: './select-wrapper.component.html',
    styleUrls: ['./select-wrapper.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SelectWrapperComponent extends BaseWrapperDirective<string> {
    @Input() label: string;
    @Input() options: ISelectItem[];
}
