import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { SocketService } from 'src/app/shared/socket/socket.service';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, public socketService: SocketService) { 
    
  }

  ngOnInit(): void {
    let holderWindowSize = (holder) => {// [?] holder is the selected holder <div> fo the component
      // [?] window reisze event | to resize holder every Browser winodw resize
      window.addEventListener("resize", function () {
        resizeContentHolder(holder);
      });
      // [?] resize the content container holder to fit the window height size
      function resizeContentHolder(elem) {
        var innerWidth = window.innerWidth;
        var innerHeightWithoutNav = window.innerHeight;
        if (innerWidth < 992) {
          $(elem).css("height", innerHeightWithoutNav);
        } else {
          if (innerHeightWithoutNav > 700) {
            $(elem).css("height", innerHeightWithoutNav);
          } else {
            $(elem).css("height", 900);
          }
        }
      }
      // [?] on load at ther realtime
      resizeContentHolder(holder);
    }
    holderWindowSize('#loginContainer')
    console.log("here");
    
  }
  onSubmit(form: NgForm) {

    this.authService.login(form.value).subscribe((res: any) => {
      this.authService.user = res;
      this.authService.setToken(res.data.token);
      this.authService.setUserID(res.data.id)
      this.authService.isAdmin = true
      this.onSocket()
    },
      err => {
        console.log(err)
      }, () => { window.location.href = '/user/profile';})
  }
  // [#] login with user id at Socket
  onSocket() {
    this.socketService.loginSocket('join', localStorage.getItem('userID'), err => {
      if (err) throw err;
    })
  }
}
