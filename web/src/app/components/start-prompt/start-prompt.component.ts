import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-start-prompt',
    templateUrl: './start-prompt.component.html',
    styleUrls: ['./start-prompt.component.scss'],
})
export class StartPromptComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    onClickCreateTeam = () => {
        this.router.navigate(['team']);
    };

    onClickCreateProject = () => {
        this.router.navigate(['project']);
    };
}
