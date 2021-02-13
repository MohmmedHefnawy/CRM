import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AssignUserService } from './../../services/assign-user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  imageBaseURL = environment.imageBaseurl
  isActive = true

  constructor(public  assignUserService:AssignUserService) { }

  ngOnInit(): void {
  }
  openPopup(){
    $('#openPop').click()
    // get dubai admin by ( role id 2)
    this.getUsersByRoleID(2)

  }
  // [#] HTTP REQs
  getUsersByRoleID(ID){
    this.assignUserService.getUsersByRoleID(ID).subscribe((res:any)=>{
      this.assignUserService.usersByRole = res.data
      console.log(res);
    })
  }
}
