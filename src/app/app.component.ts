import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { SocketService } from './shared/socket/socket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router, public socketService: SocketService) { }

  ngOnInit(): void {
    this.isLoggedIn()

  }
  title = 'crm';
  isLoggedIn() {
    switch (this.authService.isLoggedIn()) {
      case false:
        break;
      default:
        this.getUser()
        this.onSocket()
        break;
    }
  }
  getUser() {
    this.authService.getUser().subscribe((res:any) => {
      this.authService.user = res;
    })

  }
  // [#] login with user id at Socket
  onSocket() {
    this.socketService.loginSocket('join', localStorage.getItem('userID'), err => {
      if (err) throw err;
    })
  }

}
