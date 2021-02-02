import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  _url = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  // postPersonalImage(personalImage) {
  //   return this.http.post(`${this._url}updateUserData`, personalImage)
  // }

  postPersonalImage(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);
    return this.http.post(`${this._url}updateUserData`, formData)
  }


}
