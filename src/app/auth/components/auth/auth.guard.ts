import { SocketService } from 'src/app/shared/socket/socket.service';
import { Injectable, AfterViewChecked, AfterViewInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: AuthService, private router: Router, public socketService: SocketService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.userService.isLoggedIn()) {
      this.router.navigateByUrl('login');
      this.router.navigateByUrl('login');
      this.userService.deleteUserID();
      this.userService.deleteToken();
      this.socketService.socketDisconnect()
      return false;
    }
    // call login socket 
    this.onSocket()
    return true;
  }
  // [#] login with user id at Socket
  onSocket() {
    this.socketService.loginSocket('join', localStorage.getItem('userID'), err => {
      if (err) throw err;
    })
  }
}
