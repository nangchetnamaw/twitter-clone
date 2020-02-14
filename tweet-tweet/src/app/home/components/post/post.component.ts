import { Component } from "@angular/core";

@Component({
  selector: "app-post",
  styleUrls: ["./post.component.scss"],
  template: `
    <div class="app-post">
      <mat-card class="post-card">
        <mat-card-header>
          <div mat-card-avatar class="post-header--image"></div>
          <mat-card-title>Shiba Inu</mat-card-title>
          <mat-card-subtitle class="post-header--subtitle">@shibaInu</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <p>
            The Shiba Inu is the smallest of the six original and distinct spitz
            breeds of dog from Japan. A small, agile dog that copes very well
            with mountainous terrain, the Shiba Inu was originally bred for
            hunting.
          </p>
        </mat-card-content>
        <div class="post-img">
          <!-- <img
            mat-card-image
            src="https://material.angular.io/assets/img/examples/shiba2.jpg"
            alt="Photo of a Shiba Inu"
          /> -->
        </div>

        <mat-card-actions class="post-btn-container">
          <button mat-button class="post-btn post-reply">Reply</button>
          <button mat-button class="post-btn post-retweet">Retweet</button>
          <button mat-button class="post-btn post-like">LIKE</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `
})
export class PostComponent {}
