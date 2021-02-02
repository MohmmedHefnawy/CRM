import { NgForm } from '@angular/forms';
import { SettingsServiceService } from 'src/app/user/services/settings-service.service';
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordView = 'password'
  cPasswordView = 'password'

  constructor(public settingsService: SettingsServiceService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.changePass(form.value)
  }

  changePass(personalPassword) {
    this.settingsService.postPassword(personalPassword).subscribe(res => {
      console.log(res)
    })
  }

  toggleInpPass(inpId) {
    let inpType = $(`#${inpId}`).attr('type');
    let inp = $(`#${inpId}`)
    switch (inpType) {
      case 'password':
        inp.attr('type', 'text')
        break;
      case 'text':
        inp.attr('type', 'password')
        break
    }
  }

}
