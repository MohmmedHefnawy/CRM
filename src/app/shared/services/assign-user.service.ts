import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AssignUserService {
  _url = environment.apiBaseUrl;
  usersByRole;
  constructor(private http: HttpClient) { }
  // [#] get all user by pathing user role ID
  getUsersByRoleID(ID){
    return this.http.get(`${this._url}getAllTeams?role_id=${ID}`)
  }
  // [#] Assign Task To User
  postUsersByRoleID(data){
    return this.http.post(`${this._url}assignTasks`,data)
  }
}
