import { Component, Input } from "@angular/core";

@Component({
  selector: "app-post",
  styleUrls: ["./post.component.scss"],
  template: `
    <div class="app-post">
      <mat-card class="post-card">
        <mat-card-header>
          <div mat-card-avatar class="post-header--image"></div>
          <mat-card-title>{{ user.name }}</mat-card-title>
          <mat-card-subtitle class="post-header--subtitle">{{
            "@" + user.userhandle
          }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <p>
            {{ text }}
          </p>
        </mat-card-content>
        <div class="post-img">
          <!-- <img
            mat-card-image
            src="https://material.angular.io/assets/img/examples/shiba2.jpg"
            alt="Photo of a Shiba Inu"
          /> -->
        </div>

        <div class="reply-component" *ngIf="show">
          <app-reply></app-reply>
        </div>

        <mat-card-actions class="post-btn-container">
          <button mat-button class="post-btn post-reply" (click)="toggleShow()">
            <i
              class="fa fa-reply"
              aria-hidden="true"
              style="font-size: 2rem; color: #38a1f3;"
            ></i>
          </button>
          <button mat-button class="post-btn post-retweet">
            <i
              class="fa fa-retweet"
              aria-hidden="true"
              style="font-size: 2rem; color: #38a1f3;"
            ></i
            ><span>{{ commentCount }}</span>
          </button>
          <div>
          <!-- <button mat-icon-button disabled aria-label="Example icon-button with a heart icon">
    <mat-icon>favorite</mat-icon>
  </button> -->
            <button
              mat-icon-button
              color="warn"
              aria-label="Example icon-button with a heart icon"
            >
              <mat-icon>favorite</mat-icon><span>{{ likeCount }}</span>
            </button>
          </div>
        </mat-card-actions>
      </mat-card>
    </div>
  `
})
export class PostComponent {
  @Input()
  text: string;
  @Input()
  likeCount: Number;
  @Input()
  commentCount: Number;
  @Input()
  user: any;

  show: Boolean = false;

  toggleShow(): void {
    this.show = !this.show;
  }
}
