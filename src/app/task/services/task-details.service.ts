import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TaskDetailsService {
  _url = environment.apiBaseUrl;
  _URLRunTime = environment.runTimeServer;
  taskDetails;
  propStaticData;
  assignedUsers;
  propID;
  tour3DPackage: any = [];
  designertour3DPackage;
  designertour3DPackageID;
  comments: any = [];
  pagination;
  packageSafeURL: SafeResourceUrl

  // send old data to the backEnd
  old_status;
  old_category;
  old_type;
  old_city;
  // was selected amaenities
  selectedAmen = [];
  constructor(private http: HttpClient) { }
  // ! Method GET
  // Get property By ID
  getTaskById(ID) {
    return this.http.get(`${this._url}properties?id=${ID}`);
  }
  // get static data like (property_features, property_category, ...)
  getPropertyStaticData(lang) {
    return this.http.get(`${this._url}getData?lang=${lang}`);
  }
  // Get task Assign User
  getTaskAssignUser(ID) {
    return this.http.get(`${this._url}getPropertiesTasks?id=${ID}`);
  }
  // Get Photographer Image URL
  getPhotographerImageURL(propID) {
    return this.http.get(`${this._URLRunTime}AWSPhoto/${propID}/100/0`);
  }
  // Get Designer Image URL
  getDesignerImageURL(propID) {
    return this.http.get(`${this._URLRunTime}AWSVR/${propID}`);
  }
  // Get Comment 
  getAllComment(ID, items, pages) {
    return this.http.get(`${this._URLRunTime}List/Comment/Post/${ID}/${items}/${pages}`);
  }
  // ! Method POST
  // ? Post Description Form
  postPropertyData(data) {
    return this.http.post(`${this._url}properties`, data);
  }
  postPhotographerBoxRow(porpID): Observable<any> {
    return this.http.post(`${this._URLRunTime}Upload/AWSUnzip`, porpID);
  }
  deletePhotographerPackage(boxRowID) {
    return this.http.delete(`${this._URLRunTime}Delete/AWSPhoto/${boxRowID}`);
  }
  updatePhotographerPackage(boxRowID, data) {
    return this.http.patch(`${this._URLRunTime}Update/AWSPhoto/${boxRowID}`, data);
  }
  // ? Desinger APIS
  updateDesignerPackage(propID, data) {
    return this.http.patch(`${this._URLRunTime}Update/AWSPackage/${propID}`, data);
  }
  uploadDesignerPackage(data) {
    return this.http.post(`${this._URLRunTime}Upload/AWSUnzip`, data);
  }


  // ? Post Comment To Server
  postComment(data): Observable<any> {
    return this.http.post(`${this._URLRunTime}Create/Comment`, data);
  }
  // ? Delete Comment From Server
  deleteComments(commentID): Observable<any> {
    return this.http.delete(`${this._URLRunTime}Delete/Post/${commentID}`);
  }
  // ? Update Comment 
  updateComment(commentID, data): Observable<any> {
    return this.http.patch(`${this._URLRunTime}Update/Comment/${commentID}`, data);
  }

}
