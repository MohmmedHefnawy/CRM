import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskDetailsService {
  _url = environment.apiBaseUrl;
  taskDetails;
  constructor(private http: HttpClient) { }
  getTaskById(ID){
    return this.http.get(`${this._url}properties/${ID}`)
  }

}
