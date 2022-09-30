import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }

  SetToken(token: any) {
    return this.cookieService.set("social_token", token, {
      secure: true
    });
    // this.cookieService.set('usertype', 'agent', now, null, null, secureFlag, 'Lax')

  }

  GetToken() {
    return this.cookieService.get("social_token");
  }
  DeleteToken() {
    return this.cookieService.delete("social_token")
  }
  GetPayload() {
    let token = this.GetToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = JSON.parse(window.atob(payload));
    }
    return payload.data;
  }
}
