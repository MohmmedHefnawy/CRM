import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsServiceService {
  _url = environment.apiBaseUrl;
  // 
  userData;
  constructor(private http: HttpClient) { }
  // [#] API handelers
  getPersonalInfo() {
    return this.http.post(`${this._url}getUser`, null)
  }
  postPersonalInfo(personalData) {
    return this.http.post(`${this._url}updateUserData`, personalData)
  }
  // Get ChangePassword
  postPassword(personalPassword) {
    return this.http.post(`${this._url}updateUserPassword`, personalPassword)
  }
  // Post Contact Data
  // postContactInfo(contactInfo) {
  //   return this.http.post(`${this._url}updateUserData`, contactInfo)
  // }
  // [#] HTTPS REQs

}
