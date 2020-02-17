import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.scss'],
    template: `
        <div class="app-home">
            <side-nav></side-nav>
            <div class="middle">
                <h2 class="header">Home</h2>
                <app-tweet-create></app-tweet-create>
                <app-post></app-post>
            </div>
        </div>
    `
})
export class HomeComponent{}