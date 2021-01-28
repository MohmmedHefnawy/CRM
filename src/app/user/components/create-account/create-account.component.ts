import { CreateAccountServiceService } from './../../services/create-account-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(public create_srv: CreateAccountServiceService) { }

  ngOnInit(): void {
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
