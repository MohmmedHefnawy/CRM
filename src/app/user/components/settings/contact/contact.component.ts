import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SettingsServiceService } from 'src/app/user/services/settings-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public settingsService: SettingsServiceService, public authService: AuthService) { }
  ngOnInit(): void {
    this.getContact()
  }
  onSubmit(form: NgForm) {
    console.log(form.value);

    this.postContact(form.value)
  }

  getContact() {
    this.settingsService.getPersonalInfo().subscribe((res: any) => {
      this.settingsService.userData = res.data
      console.log(this.settingsService.userData);
    })
  }

  postContact(contactInfo) {
    this.settingsService.postPersonalInfo(contactInfo).subscribe(res => {
      this.authService.user = res
    })
  }

}
