import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  BASE_URL = "http://localhost:4500/api/social";

  constructor(private http: HttpClient) { }

  addPost(body: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/post/add-post`, body);
  }
  getAllPosts(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/posts`);
  }
  addLike(body: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/post/add-like`, body);
  }
  addComment(postId: any, comment: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/post/add-comment`, {
      postId,
      comment
    });
  }
  getPost(id: any): Observable<any> {
    return this.http.get(`${this.BASE_URL}/post/${id}`);
  }
}
