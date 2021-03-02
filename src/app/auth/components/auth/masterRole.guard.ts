import { SocketService } from 'src/app/shared/socket/socket.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class MasterRoleGuard implements CanActivate {
    constructor(private userService: AuthService, private router: Router, public socketService: SocketService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        switch (next.data.syncGuards){
            case 'pm': // (PM)
                if (this.userService.whoAmI() == "1") {
                    return true;
                }
                break;
            case 'pm&da': // (PM) || (DA)
                if (this.userService.whoAmI() == "1" || this.userService.whoAmI() == "2") {
                    return true;
                }
                break;
            case 'pm&da&am': // (PM) || (DA) || (AM)
                if (this.userService.whoAmI() == "1" || this.userService.whoAmI() == "2" || this.userService.whoAmI() == "3") {
                    return true;
                }
                break;
            case 'pm&da&am&ph': // (PM) || (DA) || (AM) || (PH)
                if (this.userService.whoAmI() == "1" || this.userService.whoAmI() == "2" || this.userService.whoAmI() == "3" || this.userService.whoAmI() == "4") {
                    return true;
                }
                break;
            case 'pm&da&am&ds': // (PM) || (DA) || (AM) || (DS)
                if (this.userService.whoAmI() == "1" || this.userService.whoAmI() == "2" || this.userService.whoAmI() == "3" || this.userService.whoAmI() == "5") {
                    return true;
                }
                break;
            case 'pm&da&am&cm': // (PM) || (DA) || (AM) || (CM)
                if (this.userService.whoAmI() == "1" || this.userService.whoAmI() == "2" || this.userService.whoAmI() == "3" || this.userService.whoAmI() == "6") {
                    return true;
                }
                break;
        }
        return false;
    }
}
