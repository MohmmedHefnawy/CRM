import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TaskDetailsService {
  _url = environment.apiBaseUrl;
  _urlUploadFile = environment.runTimeServer
  taskDetails;
  propStaticData;
  assignedUsers;
  propID;
  phImageURL;
  // send old data to the backEnd
  old_status;
  old_category;
  old_type;
  old_city;
  // was selected amaenities
  selectedAmen = []
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
  // Get Get Photographer Image URL
  getPhotographerImageURL(propID) {
    return this.http.get(`${this._urlUploadFile}AWSPhoto/${propID}/100/0`)
  }

  // ! Method POST

  // ? Post Description Form
  postPropertyData(data) {
    return this.http.post(`${this._url}properties`, data)
  }

  postFileUpload(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('PostID', this.propID);
    // formData.append('unzip', 'true');
    return this.http.post(`${this._urlUploadFile}Upload/AWSUnzip`, formData)
  }

  // postPhotographerImageURL(fileToUpload: File, propID): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', fileToUpload);
  //   formData.append('PostID', propID);
  //   return this.http.post(`${this._urlUploadFile}Update/AWSPhoto`, formData)
  // }
}
