import { AssignPropertiesService } from './../../../services/assign-properties.service';
import { Component, OnInit } from '@angular/core';
import { InLoadingService } from '../../../services/in-loading.service';
import { environment } from 'src/environments/environment';
import { AssignUserService } from 'src/app/shared/services/assign-user.service';

@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.css']
})
export class TeamModalComponent implements OnInit {
  today =  new Date().toJSON().slice(0,10).replace(/-/g,'/');
  imageBaseURL = environment.imageBaseurl
  searchProps
  theUsers
  propLists
  isAssigned:boolean = false
  constructor(public loading: InLoadingService, public assignPropertiesService: AssignPropertiesService) { }
  ngOnInit(): void {
    
  }
  // [#] Controls
  teamPopUp(theUsers){
    $('#openTeamPop').click()
    this.theUsers = theUsers
    this.getAllProperties("en", 25, 1, "pending","" )
    console.log(this.theUsers);
    
  }
  // Assign Properties 
  assignProp(theUsersID, taskPropsID, expiryDate){
    this.postAssignProps(theUsersID, taskPropsID, expiryDate)
  }
  // [#] REQ
  getAllProperties(lang, num, page, status, user_id){
    return this.assignPropertiesService.getAllProperties(lang, num, page, status, user_id).subscribe((res:any)=>{
      this.assignPropertiesService.propLists = res.data
      console.log(this.assignPropertiesService.propLists);
    },err =>{},()=>{
      this.checkIfAssignProps()
    })
  }

  postAssignProps(theUsersID, taskPropsID, expiryDate){
    let data = {
      users_id : theUsersID,
      post_id : taskPropsID,
      expiry_date : expiryDate
    }
    this.assignPropertiesService.postAssignProps(data).subscribe((res)=>{
      
    })
  }

  checkIfAssignProps() {
  
       let assignedUsers = this.assignPropertiesService.propLists
      for(let assingedUser of assignedUsers ){

          if(assingedUser.users_id == this.theUsers.id){
            this.theUsers.check = true
            this.theUsers.expDate = assingedUser.expiry_date
          }
        }
      
    this.isAssigned = true
  }
   
}