import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) { }

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
        break;
    }
  }
  getUser() {
    this.authService.getUser().subscribe(res => {
      this.authService.user = res;
    })
  }
}
