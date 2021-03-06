import { SocketService } from 'src/app/shared/socket/socket.service';
import { Injectable, AfterViewChecked, AfterViewInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class notAuthGuard implements CanActivate {

    constructor(private userService: AuthService, private router: Router, public socketService: SocketService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (!this.userService.isLoggedIn()) {
            return true;
        }
        this.router.navigateByUrl('user/profile');
        return false;
    }
}
