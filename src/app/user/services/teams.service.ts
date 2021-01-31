import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  _url = environment.apiBaseUrl;
  team;
  constructor(private http: HttpClient) { }

// [#] API handelers
  getTeamByRole(role){
    return this.http.get(`${this._url}getAllTeams?role_id=${role}`)
  }


  // [#] HTTPS REQs
  // getTeam
  getTeam(role_id) {
    this.getTeamByRole(role_id).subscribe((res: any) => {
      this.team = res.data
      console.log( this.team);
      
    })
  }
}
