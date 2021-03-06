import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from "../../auth/services/auth.service";
import { environment } from 'src/environments/environment'
import { SocketService } from 'src/app/shared/socket/socket.service';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  devMood = false // var for Development Mood ! prduction 
  @Output() toggelSideMenu = new EventEmitter();
  @Output() openSideMenu = new EventEmitter();
  // vars
  innerSideMenuData
  imageBaseURL = environment.imageBaseurl
  constructor(public authService: AuthService, public socketService: SocketService) { }
  ngOnInit(): void {
    let holderWindowSize = (holder) => {// [?] holder is the selected holder <div> fo the component
      // [?] window reisze event | to resize holder every Browser winodw resize
      window.addEventListener("resize", function () {
        resizeContentHolder(holder);
        checkDataToggle($('conditionIBTN'))
      });
      // [?] resize the content container holder to fit the window height size
      function resizeContentHolder(elem) {
        var innerWidth = window.innerWidth;
        var innerHeightWithoutNav = window.innerHeight;
        if (innerWidth < 992) {
          $(elem).css("height", innerHeightWithoutNav);
        } else {
          if (innerHeightWithoutNav < 1200) {
            $(elem).css("height", innerHeightWithoutNav);
          } else {
            $(elem).css("height", 900);
          }
        }
      }
      function checkDataToggle(elem) {
        switch (elem.attr('data-toggle')) {
          case "true":
            this.innerSideMenuData = true
            break
          case "false":
            this.innerSideMenuData = false
        }
      }
      // [?] on load at ther realtime
      resizeContentHolder(holder);
    }
    holderWindowSize('#sideMenuHolder')

  }
  // [#] COntrollers
  checkDataToggle(elem) {
    switch (elem.getAttribute('data-toggle')) {
      case "true":
        this.innerSideMenuData = true
        break
      case "false":
        this.innerSideMenuData = false
    }
  }
  // [#] HTTP REQs
  logOut() {
    this.authService.deleteToken();
    this.authService.deleteUserID();
    this.authService.deleteUserRoleID();
    this.socketService.socketDisconnect();
  }
}
