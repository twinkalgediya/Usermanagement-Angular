import { NgModule } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRoutingModule } from './user/user-routing.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { CoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [AppComponent, AdminComponent, UserComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UserRoutingModule,
    UserModule,
    AdminModule,
    CoreModule,
    SocialLoginModule

  ],
  exports: [FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleAppId
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.facebookAppId)
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }, Meta
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
