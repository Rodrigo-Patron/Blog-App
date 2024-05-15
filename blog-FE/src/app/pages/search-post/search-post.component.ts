import { Component } from '@angular/core';
import { PostService } from '../../service/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

@Component({
  selector: 'app-search-post',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    MatSuffix,
    MatButton,
    RouterLink,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatGridList,
    MatGridTile,
  ],
  templateUrl: './search-post.component.html',
  styleUrl: './search-post.component.scss',
})
export class SearchPostComponent {
  posts: any = [];
  name: any = '';

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar
  ) {}

  searchPost() {
    this.postService.searchPost(this.name).subscribe({
      next: (res) => {
        this.posts = res;
        // console.log(this.posts);
      },
      error: (err) => {
        this.snackBar.open('Sorry, something went wrong!', 'Close'),
          console.log(err);
      },
    });
  }
}
