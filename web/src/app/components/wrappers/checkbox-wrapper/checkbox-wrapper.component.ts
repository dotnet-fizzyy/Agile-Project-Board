import { Component, Input } from '@angular/core';
import BaseWrapperDirective from '../base-wrapper';

@Component({
    selector: 'app-checkbox-wrapper',
    templateUrl: './checkbox-wrapper.component.html',
    styleUrls: ['./checkbox-wrapper.component.scss'],
})
export class CheckboxWrapperComponent extends BaseWrapperDirective<boolean> {
    @Input() label: string;
}
