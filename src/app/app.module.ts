import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddSuperHeroComponent } from './components/add-super-hero/add-super-hero.component';
import { SuperHeroDetailsComponent } from './components/super-hero-details/super-hero-details.component';
import { SuperHeroListComponent } from './components/super-hero-list/super-hero-list.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { TokenInterceptor } from './_helpers/token.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { UserProfileComponent } from './account/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AddSuperHeroComponent,
    SuperHeroDetailsComponent,
    SuperHeroListComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
