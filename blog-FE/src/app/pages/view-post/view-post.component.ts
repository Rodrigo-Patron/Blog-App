import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from '../../service/post.service';
import { CommonModule } from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentService } from '../../service/comment.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatIcon,
    MatButton,
    MatChipSet,
    MatChip,
    MatFormField,
    ReactiveFormsModule,
    MatLabel,
    MatInput
  ],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss',
})
export class ViewPostComponent {
  postId = this.activatedRoute.snapshot.params['id'];
  post: any;
  comments:any;

  commentForm!: FormGroup;

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    //console.log(this.postId);
    this.getPost();

    this.commentForm = this.formBuilder.group({
      postedBy: [null, Validators.required],
      message: [null, Validators.required],
    });
  }

  addComment() {
    const postedBy = this.commentForm.get('postedBy')?.value;
    const message = this.commentForm.get('message')?.value;

    this.commentService
      .createComment(this.postId, postedBy, message)
      .subscribe({
        next: (res) => {
          this.snackBar.open('Your comment has been added!', 'Ok');
          this.getCommentsByPost()
        },
        error: (err) => {
          this.snackBar.open('Sorry, something went wrong!', 'Close'),
            console.log(err);
        },
      });
  }

  getCommentsByPost(){
    this.commentService.getCommentsByPost(this.postId).subscribe({
      next: (res) => {
        this.comments = res;
      },
      error: (err) => {
        this.snackBar.open('Sorry, something went wrong!', 'Close'), console.log(err);
      },
    });
  }

  getPost() {
    this.postService.getPost(this.postId).subscribe({
      next: (res) => {
        this.post = res;
        this.getCommentsByPost()
      },
      error: (err) => {
        this.snackBar.open('Sorry, something went wrong!', 'Close'), console.log(err);
      },
    });
  }

  likePost() {
    this.postService.likePost(this.postId).subscribe({
      next: (res) => {
        this.post.likeCount += 1;
      },
      error: (err) => {
        this.snackBar.open('Sorry, something went wrong!', 'Close'), console.log(err);
      },
    });
  }
}
