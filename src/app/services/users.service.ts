import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  BASE_URL = "http://localhost:4500/api/social"

  constructor(private http: HttpClient) { }

  GetAllUsers(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/users`);
  }
  GetUserById(id: any): Observable<any> {
    return this.http.get(`${this.BASE_URL}/user/${id}`);
  }
  GetUserByName(username: any): Observable<any> {
    return this.http.get(`${this.BASE_URL}/username/${username}`);
  }
  FollowUser(userFollowed: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/follow-user`, {
      userFollowed
    });
  }
  UnFollowUser(userFollowed: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/unfollow-user`, {
      userFollowed
    });
  }
  MarkNotification(id: any, deleteValue?: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/mark/${id}`, {
      id,
      deleteValue
    })
  }

  MarkAllAsRead(): Observable<any> {
    return this.http.post(`${this.BASE_URL}/mark-all`, {
      all: true
    })
  }
  AddImage(image: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/upload-image`, {
      image
    })
  }
  SetDefaultImage(imgId: any, imgVersion: any): Observable<any> {
    return this.http.get(`${this.BASE_URL}/set-default-image/${imgId}/${imgVersion}`);
  }
  ProfileNotification(id: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/view-profile`, { id });
  }
  ChangePassword(body: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/change-password`, body);
  }
}
