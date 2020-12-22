import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // [?] resize the content container holder to fit the window height size
    function resizeContentHolder(holder) {
      var innerWidth = window.innerWidth;
      var innerHeightWithoutNav = window.innerHeight;
      if (innerWidth < 992) {
        $(`#${holder}`).css("height", innerHeightWithoutNav);
      } else {
        if (innerHeightWithoutNav > 700) {
          $(`#${holder}`).css("height", innerHeightWithoutNav);
        } else {
          $(`#${holder}`).css("height", 700);
        }
      }
    }
    // [?] on load at ther realtime
    resizeContentHolder('sideMenuHolder');
  }

}
