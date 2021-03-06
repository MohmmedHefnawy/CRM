import { TaskDetailsService } from 'src/app/task/services/task-details.service';
import { AfterViewChecked, AfterViewInit, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NavigatorServicesService } from '../shared/services/navigator-services.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy, AfterViewInit {


  // Navigators
  navigator
  constructor(public navService: NavigatorServicesService, public taskDetails: TaskDetailsService, private sanitizer: DomSanitizer, private authService: AuthService) { }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.navigator = {
      icon: "/assets/Icons/Teamwork.svg",
      title: 'Prop Details',
      navigators: [],
      routers: [],
      api: []
    }
    this.navService.navigators = this.navigator;
    this.whoAmI(this.authService.whoAmI()) // who am I by role id
    this.getPropById(this.taskDetails.propID)
    this.getPhotographersPackagesByPropID(this.taskDetails.propID)
    this.getDesignerPackagesByPropID(this.taskDetails.propID)
  }
  // [#] Controllers
  // finde who is the user to Route :)
  whoAmI(userROLE) {
    switch (userROLE) {
      case '1': // PM (Project Manager)
      case '2': // DA (Dubai Admin)
      case '3': // AM (Account Manager)
        this.navigator.navigators = ['DashBoard', 'Team Status', 'Photographers', 'Designers', 'Property Details', 'Activities']
        this.navigator.routers = [`/task/details/dashBoard/${this.taskDetails.propID}`, `/task/details/teamstatus/${this.taskDetails.propID}`, `/task/details/photographer/${this.taskDetails.propID}`, `/task/details/designer/${this.taskDetails.propID}`, `/task/details/content/description/${this.taskDetails.propID}`, `/task/details/activities/${this.taskDetails.propID}`]
        break;
      case '4': // PH (PhotoGrapher)
        this.navigator.navigators = ['DashBoard', 'Photographers', 'Activities']
        this.navigator.routers = [`/task/details/dashBoard/${this.taskDetails.propID}`, `/task/details/photographer/${this.taskDetails.propID}`, `/task/details/activities/${this.taskDetails.propID}`]
        break;
      case '5': // GD (Graphic Designer)
        this.navigator.navigators = ['DashBoard', 'Designers', 'Activities']
        this.navigator.routers = [`/task/details/dashBoard/${this.taskDetails.propID}`, `/task/details/designer/${this.taskDetails.propID}`, `/task/details/activities/${this.taskDetails.propID}`]
        break;
      case '6': // CM (Content Moderator)
        this.navigator.navigators = ['DashBoard', 'Property Details', 'Activities']
        this.navigator.routers = [`/task/details/dashBoard/${this.taskDetails.propID}`, `/task/details/content/description/${this.taskDetails.propID}`, `/task/details/activities/${this.taskDetails.propID}`]
        break;
    }
  }
  getPropById(ID) {
    this.taskDetails.getTaskById(ID).subscribe((res: any) => {
      this.taskDetails.taskDetails = res.data
      // old To Back end
    }, err => { }, () => {
      this.taskDetails.propID = ID;
      this.taskDetails.old_status = this.taskDetails.taskDetails.description.status;
      this.taskDetails.old_category = this.taskDetails.taskDetails.description.category;
      this.taskDetails.old_type = this.taskDetails.taskDetails.description.type;
      this.taskDetails.old_city = this.taskDetails.taskDetails?.location.city
      this.getPropertyStaticData('en')
    })
  }
  getPropertyStaticData(lang) {
    this.taskDetails.getPropertyStaticData(lang).subscribe((res: any) => {
      this.taskDetails.propStaticData = res.data
    }, err => { }, () => { this.checkIfAmenities() })
  }
  // Add Check Prop To propStaticData [Array]
  checkIfAmenities() {
    let propStaticData = this.taskDetails.propStaticData?.property_features,
      taskDetails = this.taskDetails.taskDetails?.property_features
    for (let staticDatta of propStaticData) {
      if (taskDetails.includes(staticDatta.name)) {
        staticDatta.check = true
        this.taskDetails.selectedAmen.push(staticDatta.id)
      } else {
        staticDatta.check = false
      }
    }
  }
  // ! API GET 

  getPhotographersPackagesByPropID(propID) {
    this.taskDetails.getPhotographerImageURL(propID).subscribe((res: any) => {
      res.data ? this.taskDetails.tour3DPackage = res.data : false
      console.log(res)
      console.log(this.taskDetails.tour3DPackage);
    }, err => { this.taskDetails.tour3DPackage = [] })
  }
  getDesignerPackagesByPropID(propID) {
    this.taskDetails.getDesignerImageURL(propID).subscribe((res: any) => {
      this.taskDetails.designertour3DPackageID = res.id
      this.taskDetails.designertour3DPackage = JSON.parse(res.virtual_link)
      console.log(res)
      // console.log(this.taskDetails.designertour3DPackage);
    }, err => { this.taskDetails.designertour3DPackage = [] }, () => {
      this.taskDetails.packageSafeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.taskDetails.designertour3DPackage.Package3D)
    })
  }
  ngOnDestroy(): void {

  }
}
