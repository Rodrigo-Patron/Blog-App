import { Routes } from '@angular/router';
import { PostComponent } from './pages/post/post.component';
import { AllPostsComponent } from './pages/all-posts/all-posts.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { SearchPostComponent } from './pages/search-post/search-post.component';

export const routes: Routes = [
    {path: 'add-post', component: PostComponent},
    {path: 'posts', component: AllPostsComponent},
    {path: 'search', component: SearchPostComponent},
    {path: 'post/:id', component: ViewPostComponent}
];


