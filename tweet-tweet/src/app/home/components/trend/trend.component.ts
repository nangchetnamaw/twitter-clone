import { Component } from "@angular/core";

@Component({
  selector: "app-trend",
  styleUrls: ["./trend.component.scss"],
  template: `
    <mat-card class="app-trend">
      <mat-card-header class="app-trend__header">
        <mat-card-title class="app-trend__header--title">#ShivaniBansal</mat-card-title>
        <mat-card-subtitle class="app-trend__header--subtitle">100k Tweets</mat-card-subtitle>
      </mat-card-header>
    </mat-card>
  `
})
export class TrendComponent {}
