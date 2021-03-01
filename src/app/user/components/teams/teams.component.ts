import { TeamModalComponent } from '../../../shared/components/popUps/team-modal/team-modal.component';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
// services
import { NavigatorServicesService } from './../../../shared/services/navigator-services.service';
import { TeamsService } from '../../services/teams.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment'
import { UserTaskService } from 'src/app/task/services/user-task.service';
import { AssignUserService } from 'src/app/shared/services/assign-user.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit, OnDestroy {
  @ViewChild(TeamModalComponent) teamModalPopUp: TeamModalComponent

  // Navigators
  navigator = {
    icon: "/assets/Icons/Teamwork.svg",
    title: 'teams',
    navigators: [ 'Dubai Admins', 'Account Manegers', 'Photographers', 'Designers', 'Content Creators'],
    routers: [ '/user/teams/dubai-admins', '/user/teams/account-managers', '/user/teams/photographers', '/user/teams/designers', '/user/teams/content-creators'],
    api: [2, 3, 4, 5, 6]
  }
  imageBaseURL = environment.imageBaseurl
  constructor(
    public navService: NavigatorServicesService,
    public teamService: TeamsService,
    private router: Router,
    public userTaskService: UserTaskService,
    public assignUserService: AssignUserService,
  ) { }
  ngOnInit(): void {
    this.navService.navigators = this.navigator;
    this.matchedRoutes()
  }

  // fire if it thie component restarted to get the api caling index
  matchedRoutes() {
    for (let route of this.navService.navigators?.routers) {
      this.router.url === route ? this.teamService.getTeam(this.navigator.api[this.navService.navigators?.routers.indexOf(route)]) : false
    }
  }
   // [#] Controller
  // open modal from ModalComponent
  openPopUpTeam(e, theUser, action){
    e.stopPropagation()
    this.teamModalPopUp.openTeamPopup(action, theUser)
  }
  // [#] REQ
  // Get Profile User
  goToUserProfile(iD) {
    let userID = { user_id: iD }
    this.teamService.getUserByID(userID).subscribe((res: any) => {
      this.teamService.oneUser = res.data
      localStorage.setItem("teamUser", JSON.stringify(this.teamService.oneUser))
    }, err => {

    }, () => {
      this.getUserTaskByUserID('en', 1, 10, '', iD)
      this.router.navigate(['/user/profile/user'])
    })
  }
  // Get All Task properties Which User Assign It
  getUserTaskByUserID(lang, page, num, status, userID) {
    this.userTaskService.getUserTask(lang, page, num, status, userID).subscribe((res: any) => {
      this.userTaskService.userTasks = res.data
    })
  }
  ngOnDestroy(): void {
  }
}
