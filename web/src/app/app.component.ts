import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public readonly title = 'myapp';
    public readonly showHeader: boolean;

    constructor() {
        this.showHeader = this.displayHeader();
    }

    private displayHeader = (): boolean => {
        const route = window.location.pathname.replace('/', '');

        return route !== 'sign-in' && route !== 'registration';
    };
}
