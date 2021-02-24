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
  postID
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
  getAllComment(ID){
    return this.http.get(`${this._urlUploadFile}List/Comment/Post/${ID}/100/0`)
  }
  // ! Method POST
  // ? Post Description Form
  postPropertyData(data) {
    return this.http.post(`${this._url}properties`, data)
  }
  // ? Post Upload File
  postFileUpload(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('PostID', this.propID);
    // formData.append('unzip', 'true');
    return this.http.post(`${this._urlUploadFile}Upload/AWSUnzip`, formData)
  }
  // ? Post Comment To Server
  postComment(data):Observable<any> {
    return this.http.post(`${this._urlUploadFile}Create/Comment`, data)
  }

  deleteComments(post_id){
    return this.http.delete(`${this._urlUploadFile}Classes/search.php`,post_id)
  }
  // postPhotographerImageURL(fileToUpload: File, propID): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', fileToUpload);
  //   formData.append('PostID', propID);
  //   return this.http.post(`${this._urlUploadFile}Update/AWSPhoto`, formData)
  // }
}
