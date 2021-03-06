import { TeamModalComponent } from '../../../shared/components/popUps/team-modal/team-modal.component';
import { AfterContentChecked, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
// services
import { NavigatorServicesService } from './../../../shared/services/navigator-services.service';
import { TeamsService } from '../../services/teams.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment'
import { UserTaskService } from 'src/app/task/services/user-task.service';
import { AssignUserService } from 'src/app/shared/services/assign-user.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit, OnDestroy, AfterContentChecked {
  @ViewChild(TeamModalComponent) teamModalPopUp: TeamModalComponent

  // Navigators
  navigator = {
    icon: "/assets/Icons/Teamwork.svg",
    title: 'teams',
    navigators: [], //[ 'Dubai Admins', 'Account Manegers', 'Photographers', 'Designers', 'Content Creators'],
    routers: [], //['/user/teams/dubai-admins', '/user/teams/account-managers', '/user/teams/photographers', '/user/teams/designers', '/user/teams/content-creators']
    api: [2, 3, 4, 5, 6]
  }
  imageBaseURL = environment.imageBaseurl
  constructor(
    public navService: NavigatorServicesService,
    public teamService: TeamsService,
    private router: Router,
    public userTaskService: UserTaskService,
    public assignUserService: AssignUserService,
    private authService: AuthService,
    ) {
   }

  ngOnInit(): void {
    this.whoAmI(this.authService.whoAmI()) // who am I by role id
    this.navService.navigators = this.navigator;
    this.matchedRoutes()
  }
  ngAfterContentChecked(){
  }

  // fire if it thie component restarted to get the api caling index
  matchedRoutes() {
    console.log(this.router.url);
    
    for (let route of this.navService.navigators?.routers) {
      this.router.url === route ? this.teamService.getTeam(this.navigator.api[this.navService.navigators?.routers.indexOf(route)]) : false
    }
  }
  // finde who is the user to Route :)
  whoAmI(userROLE) {
    switch (userROLE){
      case '1': // PM (Project Manager)
        this.navigator.navigators = ['Dubai Admins', 'Account Manegers', 'Photographers', 'Designers', 'Content Creators']
        this.navigator.routers = ['/user/teams/dubai-admins', '/user/teams/account-managers', '/user/teams/photographers', '/user/teams/designers', '/user/teams/content-creators']
        this.navigator.api = [2, 3, 4, 5, 6]
        break;
      case '2': // DA (Dubai Admin)
        this.navigator.navigators = ['Photographers', 'Designers']
        this.navigator.routers = ['/user/teams/photographers', '/user/teams/designers']
        this.navigator.api = [4, 5]
        break;
      case '3': // AM (Account Manager)
        break;
      case '4': // PH (PhotoGrapher)
        break;
      case '5': // GD (Graphic Designer)
        break;
      case '6': // CM (Content Moderator)
        break;
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
