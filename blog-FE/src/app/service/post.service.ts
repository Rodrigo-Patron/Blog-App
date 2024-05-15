import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

 createPost(data: any): Observable<any> {
    return this.http.post(BASE_URL + `/posts`, data);
  }

 getAllPosts(): Observable<any> {
    return this.http.get(BASE_URL + `/posts`);
  }

 getPost(postId:number): Observable<any> {
    return this.http.get(BASE_URL + `/posts/${postId}`);
  }

 likePost(postId:number): Observable<any> {
    return this.http.put(BASE_URL + `/posts/${postId}/likePost`,{});
  }

  searchPost(name:string): Observable<any> {
    return this.http.get(BASE_URL + `/posts/search/${name}`);
  }

}
