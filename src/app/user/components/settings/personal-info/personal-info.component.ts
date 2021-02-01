import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs/operators';
import { SettingsServiceService } from 'src/app/user/services/settings-service.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  constructor(public settingsService: SettingsServiceService) { }
  genders = ['male', 'female']
  ngOnInit(): void {
    this.getPersonalInfo()
  }
  getPersonalInfo(){
    this.settingsService.getPersonalInfo().subscribe((res: any)=>{
      this.settingsService.userData = res.data
      console.log(this.settingsService.userData);
      
    })
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    
  }
}
