import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { User } from '../Model/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  selectedUser: User = {
    email: '',
    password: ''
  };
  isAdmin: boolean = false;
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True'}) };
  _url = environment.apiBaseUrl + "login";
  // _url = "http://jsonplaceholder.typicode.com/todos/1";
  constructor(private http: HttpClient, private router: Router) { }
  //HttpMethods
  postUser(user: User) {
    // return this.http.post(this._url + '/register', user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(this._url, authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(this._url + '/userProfile');
  }
  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
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
    if (userPayload){
      return userPayload
    }
    else
      return false;
  }
}
