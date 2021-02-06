import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs/operators';
import { SettingsServiceService } from 'src/app/user/services/settings-service.service';
import { NgForm } from "@angular/forms";
import { AuthService } from 'src/app/auth/services/auth.service';
import { InLoadingService } from 'src/app/shared/services/in-loading.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  constructor(public settingsService: SettingsServiceService, public authService: AuthService, public loading: InLoadingService) { }
  gendersv = ['M', 'F']
  genders = ['male', 'female']
  ngOnInit(): void {
    this.getPersonalInfo()
  }
  getPersonalInfo() {
    this.settingsService.getPersonalInfo().subscribe((res: any) => {
      this.settingsService.userData = res.data
    })
  }
  onSubmit(form: NgForm) {
    console.log(form.value);

    this.postPersonalData(form.value)

  }
  postPersonalData(data) {
    console.log(this.loading.loader);

    // setTimeout(() => {
    this.settingsService.postPersonalInfo(data).subscribe(res => {
      this.loading.loader.start()
      this.authService.user = res
    }, err => {
      this.loading.loader.complete()
    }, () => {
      this.loading.loader.complete()
    })

    // }, 5000)
  }
}
