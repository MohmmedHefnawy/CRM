import { AssignPropertiesService } from './../../../services/assign-properties.service';
import { Component, OnInit } from '@angular/core';
import { InLoadingService } from '../../../services/in-loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.css']
})
export class TeamModalComponent implements OnInit {
  today =  new Date().toJSON().slice(0,10).replace(/-/g,'/');
  imageBaseURL = environment.imageBaseurl
  searchProps
  theUser
  constructor(public loading: InLoadingService, public assignPropertiesService: AssignPropertiesService) { }
  // [#] Controls
  teamPopUp(theUser){
    $('#openTeamPop').click()
    this.theUser = theUser
    this.getAllProperties("en", 25, 1, "pending","" )
  }

  ngOnInit(): void {
  }
  // [#] REQ
  getAllProperties(lang, num, page, status, user_id){
    return this.assignPropertiesService.getAllProperties(lang, num, page, status, user_id).subscribe((res:any)=>{
      this.assignPropertiesService.propList = res.data
      console.log(this.assignPropertiesService.propList);
    })
  }


}
