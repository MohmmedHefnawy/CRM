import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs/operators';
import { SettingsServiceService } from 'src/app/user/services/settings-service.service';
import { NgForm } from "@angular/forms";
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  constructor(public settingsService: SettingsServiceService, public authService: AuthService) { }
  genders = ['male', 'female']
  ngOnInit(): void {
    this.getPersonalInfo()
  }
  getPersonalInfo(){
    this.settingsService.getPersonalInfo().subscribe((res: any)=>{
      this.settingsService.userData = res.data
    })
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    
    this.postPersonalData(form.value)
    
  }
  postPersonalData(data){
    this.settingsService.postPersonalInfo(data).subscribe(res=>{
      this.authService.user = res
    })
  }
}
