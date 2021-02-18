import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignPropertiesService {
  _url = environment.apiBaseUrl;
  propLists
  pagination
  constructor(private http: HttpClient, ) { }

  getAllProperties(lang, num, page, status, user_id){
    return this.http.get(`${this._url}properties?lang=${lang}&num=${num}&page=${page}&status=${status}&user_id=${user_id}`)
  }

  postAssignProps(data){
    return this.http.post(`${this._url}assignTasks`,data)
  }
  getAssignUsers(ID){
    return this.http.get(`${this._url}getPropertiesTasks?id=${ID}`)
  }
}
