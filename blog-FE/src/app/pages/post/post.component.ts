import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import {
  MatChipGrid,
  MatChipInput,
  MatChipRemove,
  MatChipRow,
} from '@angular/material/chips';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from '../../service/post.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatChipGrid,
    MatChipRow,
    MatChipInput,
    MatChipRemove,
    MatIcon,
    MatButton,
    ReactiveFormsModule,
    
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  postForm!: FormGroup;
  tags: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      name: [null, Validators.required],
      content: [null, [Validators.required, Validators.maxLength(5000)]],
      img: [null, Validators.required],
      postedBy: [null, Validators.required],
    });
  }

  addTag(event: any) {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }
  removeTag(tag: any) {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  createPost() {
    const data = this.postForm.value;
    data.tags = this.tags;

    this.postService.createPost(data).subscribe({
      next: (res) => {
        this.snackBar.open('Post created successfully!', 'Close');
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.snackBar.open('Something went wrong!', 'Close'), console.log(err);
      },
    });
  }
}
