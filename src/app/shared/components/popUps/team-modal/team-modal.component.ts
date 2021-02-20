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
  propLists
  isAssigned:boolean = false
  constructor(public loading: InLoadingService, public assignPropertiesService: AssignPropertiesService) { }
  ngOnInit(): void {
   
  }
  // [#] Controls
  openTeamPopup(theUser){
    $('#openTeamPop').click()
    this.isAssigned = false
    this.theUser = theUser
    console.log( this.theUser)
    this.getAllProperties("en", 25, 1, "inProgress","" )
  }
    handlePageChange(event) {
    // $('.M0-content-holder').get(0).scrollTo({ top: 0, behavior: 'smooth' });
    this.getAllProperties('en', 25 , event, 'inProgress', '')
  }
  // Assign Properties 
  assignProp(theUsersID, taskPropsID, expiryDate){
    this.postAssignProps(theUsersID, taskPropsID, expiryDate)
  }
  // [#] HTTP REQs
  getAllProperties(lang, num, page, status, user_id){
     this.assignPropertiesService.getAllProperties(lang, num, page, status, user_id).subscribe((res:any)=>{
      this.assignPropertiesService.propLists = res.data
      this.assignPropertiesService.pagination =  res.pages
    },err =>{},()=>{
      this.getTeamProperties(this.theUser.id);
      })
  }
  getTeamProperties(user_id){
    this.assignPropertiesService.getAllProperties("", "", "", "", user_id).subscribe((res:any)=>{
    this.assignPropertiesService.userProperties = res.data
    console.log(this.assignPropertiesService.userProperties);
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
      console.log(res);
      
    },err =>{},()=>{
      this.getTeamProperties(this.theUser.id)
    })
  }
  // Check Properties By ID 
  checkIfAssignProps() {
    let userProperties = this.assignPropertiesService.userProperties,
        allProperties = this.assignPropertiesService.propLists;
    for(let userProp of userProperties){
      for(let prop of allProperties ){
          if(prop.id == userProp.id){
            prop.check = true
      }
    }
  }
  this.isAssigned = true

}
}