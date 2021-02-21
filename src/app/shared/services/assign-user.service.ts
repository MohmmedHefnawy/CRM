import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AssignUserService {

  _url = environment.apiBaseUrl;
  usersByRole;
  assignUsers;
  propLists
  pagination
  userProperties

  constructor(private http: HttpClient) { }

  // [#] Get All Properties
  getAllProperties(lang, num, page, status, user_id){
    return this.http.get(`${this._url}properties?lang=${lang}&num=${num}&page=${page}&status=${status}&user_id=${user_id}`)
  }
  // [#] get all user by pathing user role ID
  getUsersByRoleID(ID){
    return this.http.get(`${this._url}getAllTeams?role_id=${ID}`)
  }
  getAssignUsers(ID){
    return this.http.get(`${this._url}getPropertiesTasks?id=${ID}`)
  }
  // [#] Assign Task To User
  postUsersByRoleID(data){
    return this.http.post(`${this._url}assignTasks`,data)
  }
  // [#] delete User From Tasks
  deleteUserFromProp(userID, propID){
    return this.http.delete(`${this._url}deleteTask?users_id=${userID}&wp_post_id=${propID}`)
  }
  propChangeStatus(data){
    return this.http.post(`${this._url}changeTaskStatus`, data)
  }
}
