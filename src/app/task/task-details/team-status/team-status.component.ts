import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetailsService } from '../../services/task-details.service';
import { environment } from 'src/environments/environment';
import { ModalComponent } from 'src/app/shared/components/popUps/task-modal/modal.component';


@Component({
  selector: 'app-team-status',
  templateUrl: './team-status.component.html',
  styleUrls: ['./team-status.component.css']
})
export class TeamStatusComponent implements OnInit {
  @ViewChild(ModalComponent) taskModal: ModalComponent
  imageBaseURL = environment.imageBaseurl

  prop
  constructor(public taskDetailsService: TaskDetailsService, private Activerouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.taskDetailsService.propID = this.Activerouter.snapshot.params['id']
    this.getUsersToAssign(this.taskDetailsService.propID)
    
  }

  // [#] Controler
  openModal(){
    console.log(this.taskDetailsService.taskDetails)
  this.prop = {
    title: this.taskDetailsService.taskDetails.description.title,
    id: this.taskDetailsService.taskDetails.id,
    images: this.taskDetailsService.taskDetails.images
  }
    this.taskModal.openPopup(this.prop , 2)
  }


  // [#] REQ
  getUsersToAssign(ID) {
    this.taskDetailsService.getTaskAssignUser(ID).subscribe((res: any) => {
      this.taskDetailsService.assignedUsers = res.data
    })
  }


}
