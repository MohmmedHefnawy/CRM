import { CreateAccountServiceService } from './../../services/create-account-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NavigatorServicesService } from 'src/app/shared/services/navigator-services.service';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  // Navigators
  navigator = {
    icon: "/assets/Icons/Plus.svg",
    title: 'Add User',
  }
  constructor(public navService: NavigatorServicesService, public create_srv: CreateAccountServiceService) { }

  ngOnInit(): void {
    this.navService.navigators = this.navigator;

  }
  // # Controller

  // # HTTP REQs
  onSubmit(form: NgForm) {

    this.create_srv.postNewUser(form.value).subscribe(res => {
      console.log(res);

    }, err => {
      console.log(err);

    })

  }
}
