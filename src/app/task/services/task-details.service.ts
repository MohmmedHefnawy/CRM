import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TaskDetailsService {
  _url = environment.apiBaseUrl;
  taskDetails;
  propStaticData;
  propID;
  constructor(private http: HttpClient) { }
  // Get property By ID
  getTaskById(ID) {
    return this.http.get(`${this._url}properties?id=${ID}`)
  }
  // get static data like (property_features, property_category, ...)
  getPropertyStaticData(lang) {
    return this.http.get(`${this._url}getData?lang=${lang}`)
  }
}
