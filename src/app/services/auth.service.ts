import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = "http://localhost:4500/api/social";
  constructor(private http: HttpClient) { }

  register(body: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register`, body);
  }
  login(body: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`, body);
  }

}
