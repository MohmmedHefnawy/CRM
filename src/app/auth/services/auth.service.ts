import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { User } from '../Model/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAdmin: boolean = false;
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  // this current user
  user;
  users
  _url = environment.apiBaseUrl;
  // _url = "http://jsonplaceholder.typicode.com/todos/1";
  constructor(private http: HttpClient, private router: Router) { }
  //HttpMethods
  postUser(user: User) {
    // return this.http.post(this._url + '/register', user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(`${this._url}login`, authCredentials, this.noAuthHeader);
  }

  getUser() {
    return this.http.post(`${this._url}getUser`, null);
  }
  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  setUserID(userID) {
    localStorage.setItem('userID', userID);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteUserID() {
    localStorage.removeItem('userID');
  }
  deleteToken() {
    localStorage.removeItem('token');
    // this.router.navigateByUrl('login');
    window.location.href = '/login';
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }
  isLoggedIn() {
    var userPayload = this.getUserPayload();

    if (userPayload) {
      return userPayload
    }
    else
      return false;
  }
}
