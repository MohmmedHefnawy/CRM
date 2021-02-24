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
  tour3DPackage = [];
  comments
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
  // Get Photographer Image URL
  getPhotographerImageURL(propID) {
    return this.http.get(`${this._urlUploadFile}AWSPhoto/${propID}/100/0`)
  }
  // Get Comment 
  getAllComment(ID) {
    return this.http.get(`${this._urlUploadFile}List/Comment/Post/${ID}/100/0`)
  }
  // ! Method POST
  // ? Post Description Form
  postPropertyData(data) {
    return this.http.post(`${this._url}properties`, data)
  }

  postPhotographerBoxRow(porpID): Observable<any> {
    return this.http.post(`${this._urlUploadFile}Upload/AWSUnzip`, porpID)
  }
  deletePhotographerPackage(boxRowID) {
    return this.http.delete(`${this._urlUploadFile}Delete/AWSPhoto/${boxRowID}`)
  }
  updatePhotographerPackage(boxRowID, data) {
    return this.http.patch(`${this._urlUploadFile}Update/AWSPhoto/${boxRowID}`, data)
  }

  // ? Post Comment To Server
  postComment(data): Observable<any> {
    return this.http.post(`${this._urlUploadFile}Create/Comment`, data)
  }

  deleteComments(post_id) {
    return this.http.delete(`${this._urlUploadFile}Classes/search.php`, post_id)
  }

}
