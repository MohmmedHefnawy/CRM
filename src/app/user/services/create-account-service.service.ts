import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CreateAccountServiceService {
  _url = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  // Create New User
  postNewUser(data) {
    return this.http.post(`${this._url}register`, data);
  }
}
