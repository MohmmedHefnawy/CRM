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
  assignedUsers;
  propID;
  // send old data to the backEnd
  old_status;
  old_category;
  old_type;
  constructor(private http: HttpClient) { }
  // ! Method GET
  // Get property By ID
  getTaskById(ID) {
    return this.http.get(`${this._url}properties?id=${ID}`)
  }
  // get static data like (property_features, property_category, ...)
  getPropertyStaticData(lang) {
    return this.http.get(`${this._url}getData?lang=${lang}`)
  }
  // Get task Assign User
  getTaskAssignUser(ID) {
    return this.http.get(`${this._url}getPropertiesTasks?id=${ID}`)
  }

  // ! Method POST

  // ? Post Description Form
  postPropertyDescription(data) {
    return this.http.post(`${this._url}properties`, data)
  }
}
