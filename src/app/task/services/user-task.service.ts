import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
  export class UserTaskService {
  _url = environment.apiBaseUrl;
  userTasks;
  constructor(private http: HttpClient  ) { }
  // get tasks for user in user profile
  getUserTask(lang, page, num, status, userID){
    return this.http.get(`${this._url}properties?lang=${lang}&page=${page}&num=${num}&status=${status}&user_id=${userID}`)
  }
}
