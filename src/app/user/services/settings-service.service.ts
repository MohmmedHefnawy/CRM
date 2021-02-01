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
  getPersonalInfo(){
    return this.http.post(`${this._url}getUser`, null)
  }


  // [#] HTTPS REQs
}
