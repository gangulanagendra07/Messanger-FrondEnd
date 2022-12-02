import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { JwtInterceptor } from './services/jwt.interceptor';
import { AppComponent } from './app.component';
// import { AuthModule } from './modules/auth.module';
// import { AuthRoutingModule } from './modules/auth-routing.module';
import { SharedModule } from './shared/shared.module';
// import { StreamModule } from './modules/stream.module';
// import { StreamRoutingModule } from './modules/stream-routing.module';



@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    // StreamModule,
    // StreamRoutingModule

  ],
  providers: [CookieService,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
