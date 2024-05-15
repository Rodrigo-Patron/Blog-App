import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {}


  createComment(postId:number, postedBy:string, message:string): Observable<any> {
    const params={
      postId:postId,
      postedBy:postedBy
    }
    return this.http.post<any>(BASE_URL + `/comments`, message, {params});
  }


  getCommentsByPost(postId:number):Observable<any>{
    return this.http.get(BASE_URL + `/comments/${postId}`)
  }
}
