import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { globalVar } from '../global';

const baseApiUrl = globalVar.BASE_API_URL;

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor( 
    private router: Router,
    private http: HttpClient) { 
      this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      this.user = this.userSubject.asObservable();
    }

  public get userValue() {
      return this.userSubject.value;
  }

  login(email: string, password: string) {
      return this.http.post<User>(`${baseApiUrl}/login`, { email, password })
          .pipe(map(response => {
              //console.log('response', response);
              var userInfo: User = {
                email : email,
                accessToken : response.accessToken,
                refreshToken : response.refreshToken
              };
              
              // store user details and token in local storage to keep user logged in between page refreshes
              localStorage.setItem('user', JSON.stringify(userInfo));
              this.userSubject.next(userInfo);
              return userInfo;
          }));
  }

  logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('user');
      this.userSubject.next(null);
      this.router.navigate(['/account/login']);
  }

  register(user: User) {
    return this.http.post(`${baseApiUrl}/register`, user);
  }
}
