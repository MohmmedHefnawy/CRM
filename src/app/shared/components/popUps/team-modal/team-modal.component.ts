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
    console.log( this.theUsers)
    this.getAllProperties("en", 25, 1, "pending","" )
    console.log(this.theUsers);
  }
    handlePageChange(event) {
    
    // $('.M0-content-holder').get(0).scrollTo({ top: 0, behavior: 'smooth' });
    this.getAllProperties('en', 25 , event, 'pending', '')
  }
  // Assign Properties 
  assignProp(theUsersID, taskPropsID, expiryDate){
    this.postAssignProps(theUsersID, taskPropsID, expiryDate)
  }
  // [#] HTTP REQs
  getAllProperties(lang, num, page, status, user_id){
     this.assignPropertiesService.getAllProperties(lang, num, page, status, user_id).subscribe((res:any)=>{
      this.assignPropertiesService.propLists = res.data
      console.log(this.assignPropertiesService.propLists);
      this.assignPropertiesService.pagination =  res.pages
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
      
    })
  }
  checkIfAssignProps() {
      let props = this.assignPropertiesService.propLists
      for(let prop of props ){
          if(prop.users_id == this.theUsers.id){

            prop.check = true
            prop.expDate = prop.expiry_date
          }
        }
    this.isAssigned = true
  }
}