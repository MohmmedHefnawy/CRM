import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigatorServicesService } from 'src/app/shared/services/navigator-services.service';
import { TaskDetailsService } from '../../services/task-details.service';
import { environment } from 'src/environments/environment';
import { ModalComponent } from '../../../shared/components/popUps/task-modal/modal.component';
import { UserTaskService } from '../../services/user-task.service';
import { UsersMapService } from 'src/app/shared/services/users-map.service';



@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  @ViewChild(ModalComponent) taskModal: ModalComponent
  navigator
  imageBaseURL = environment.imageBaseurl
  prop

  constructor(public taskDetailsService: TaskDetailsService, private Activerouter: ActivatedRoute, public navService: NavigatorServicesService,  public userTaskService: UserTaskService,
    public usersMapService: UsersMapService,) { }

  ngOnInit(): void {
    this.taskDetailsService.propID = this.Activerouter.snapshot.params['id']
    // progress bar
    $(function () {
      $(".progress").each(function () {
        const value = $(this).attr('data-value');
        const left = $(this).find('.progress-left .progress-bar');
        const right = $(this).find('.progress-right .progress-bar');
        if (value > 0) {
          if (value <= 50) {
            right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
          } else {
            right.css('transform', 'rotate(180deg)')
            left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
          }
        }
      })
      function percentageToDegrees(percentage) {
        return percentage / 100 * 360
      }
    });
    this.getUsersToAssign(this.taskDetailsService.propID)
  }
  // [#] Controls
  openModal(){
    console.log(this.taskDetailsService.taskDetails)
    this.prop = {
      title : this.taskDetailsService.taskDetails.description.title,
      id : this.taskDetailsService.taskDetails.id,
      images : this.taskDetailsService.taskDetails.images
    }
    this.taskModal.openPopup(this.prop  , 2)
  }
  ngAfterViewInit() {
    this.navigator = {
      icon: "/assets/Icons/Teamwork.svg",
      title: 'Prop Details',
      navigators: ['DashBoard', 'Team Status', 'Photographers', 'Designers', 'Property Details', 'Activities'],
      routers: [`/task/details/dashBoard/${this.taskDetailsService.propID}`, `/task/details/teamstatus/${this.taskDetailsService.propID}`, `/task/details/photographer/${this.taskDetailsService.propID}`, `/task/details/designer/${this.taskDetailsService.propID}`, `/task/details/content/description/${this.taskDetailsService.propID}`, `/task/details/activities/${this.taskDetailsService.propID}`],
      api: []
    }
    this.navService.navigators = this.navigator;
  }
  // [#] HTTP REQs
  getUsersToAssign(ID) {
    this.taskDetailsService.getTaskAssignUser(ID).subscribe((res: any) => {
      this.taskDetailsService.assignedUsers = res.data
      
    })
  }

}
