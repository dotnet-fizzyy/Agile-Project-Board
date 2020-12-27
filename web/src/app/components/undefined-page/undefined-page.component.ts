import { Component } from '@angular/core';

@Component({
    selector: 'app-undefined-page',
    templateUrl: './undefined-page.component.html',
    styleUrls: ['./undefined-page.component.scss'],
})
export class UndefinedPageComponent {
    public readonly route: string;

    constructor() {
        this.route = window.location.href;
    }
}
