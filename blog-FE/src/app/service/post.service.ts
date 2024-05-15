import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

 createPost(data: any): Observable<any> {
    return this.http.post(BASE_URL + `api/posts`, data);
  }

 getAllPosts(): Observable<any> {
    return this.http.get(BASE_URL + `api/posts`);
  }

 getPost(postId:number): Observable<any> {
    return this.http.get(BASE_URL + `api/posts/${postId}`);
  }

 likePost(postId:number): Observable<any> {
    return this.http.put(BASE_URL + `api/posts/${postId}/likePost`,{});
  }

}
