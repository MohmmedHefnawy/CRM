import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigatorServicesService } from 'src/app/shared/services/navigator-services.service';
import { TaskDetailsService } from '../../services/task-details.service';
import { environment } from 'src/environments/environment';
import { ModalComponent } from '../../../shared/components/popUps/task-modal/modal.component';
import { UserTaskService } from '../../services/user-task.service';
import { UsersMapService } from 'src/app/shared/services/users-map.service';
import { TeamsService } from 'src/app/user/services/teams.service';
import { SocketService } from 'src/app/shared/socket/socket.service';
import { AuthService } from 'src/app/auth/services/auth.service';


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
    public usersMapService: UsersMapService, public teamService: TeamsService, private router: Router,public socketService: SocketService, private authService : AuthService) { }

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
    this.socketON('Uploaded')
    this.socketON('Error_Uploaded')
    this.getAllComment(this.taskDetailsService.propID, 100, 0)
  }
  // [#] Controls
  openModal(){
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
  // Clear Comment Input Field
  emptyInp(inp){
    $(`#${inp}`).val("")
  }
  // Focus Input
  focusInp(inp){
    console.log(inp);
    
    setTimeout(()=>{inp.focus()}, 1)
    // commentTextHolder['data-comment'] = true;
  }
  handlePageChange(event) {
    $('.M0-content-holder').get(0).scrollTo({ top: 0, behavior: 'smooth' });
    this.getAllComment(this.taskDetailsService.propID, 5 , event)
  }
  // [#] HTTP REQs
  getUsersToAssign(propID) {
    this.taskDetailsService.getTaskAssignUser(propID).subscribe((res: any) => {
      this.taskDetailsService.assignedUsers = res.data
      console.log(this.taskDetailsService.assignedUsers);
    })
  }
  // Go To User Profile
  goToUserProfile(userId) {
    let userID = { user_id: userId }
    console.log(userID);
    this.teamService.getUserByID(userID).subscribe((res: any) => {
      this.teamService.oneUser = res.data
      localStorage.setItem("teamUser", JSON.stringify(this.teamService.oneUser))
    }, err => {
    }, () => {
      // this.getUsersToAssign(userId)
      this.router.navigate(['/user/profile/user'])
    })
  }
  // Get All Comment PostID & Count & Page_Num
  getAllComment(propID, items, pages){
    this.taskDetailsService.getAllComment(propID, items, pages).subscribe((res:any)=>{
      this.taskDetailsService.comments = res.data
      console.log(res)
      console.log(this.taskDetailsService.comments);
    }, err=>{this.taskDetailsService.comments = []})
  }
  // Get Users Auth ID
  getUsersAuthId(){
    this.authService.getUser().subscribe((res:any)=>{
      this.authService.users = res.data
      console.log(this.authService.users);
    })
  }
  // Post Comment To Server
  postComment(commentInputValue, commentInp){
    let data = {
          comment : commentInputValue,
          post_id : this.taskDetailsService.propID
        } 
    this.taskDetailsService.postComment(data).subscribe((res)=>{
      console.log(res);
    }, err =>{},()=>{
      // ! Need Best Code
      this.getAllComment(this.taskDetailsService.propID, 100, 0)
      this.emptyInp(commentInp)
    })
  }
  // Delete Comments By PostID
  deleteComments(commentID){
    this.taskDetailsService.deleteComments(commentID).subscribe((res)=>{
      console.log(res);
    }, err => {},()=>{
      this.getAllComment(this.taskDetailsService.propID, 100, 0)
    })
  }
  // Update Comments
  updateComment(commentID, commentInputValue){
    let data = {
      comment: commentInputValue,
    }
    this.taskDetailsService.updateComment(commentID, data).subscribe((res)=>{
      console.log(res);
      
    })
  }
  // Listner To Data From Server
  socketON(listner) {
    this.socketService.socketON(listner).subscribe(res => {
      console.log(`Receiver From DashBoard Component : ...... ${res}`);
    }, err => {
    }, () => {
    })
  }
}