import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  BASE_URL = "http://localhost:4500/api/social";

  constructor(private http: HttpClient) { }

  sendMessage(senderId: any, receiverId: any, receiverName: any, message: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/social-message/${senderId}/${receiverId}`, {
      receiverId,
      receiverName,
      message
    })
  }
  getAllMessages(senderId: any, receiverId: any): Observable<any> {
    return this.http.get(`${this.BASE_URL}/social-message/${senderId}/${receiverId}`);
  }
}
