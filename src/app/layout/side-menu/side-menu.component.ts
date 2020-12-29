import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  @Output() toggelSideMenu = new EventEmitter();
  constructor() { }
  ngOnInit(): void {
    // [?] resize the content container holder to fit the window height size
    function resizeContentHolder(holder) {
      var innerWidth = window.innerWidth;
      var innerHeightWithoutNav = window.innerHeight - 60;
      if (innerWidth < 992) {
        $(`#${holder}`).css("height", innerHeightWithoutNav);
      } else {
        if (innerHeightWithoutNav > 700) {
          $(`#${holder}`).css("height", innerHeightWithoutNav);
        } else {
          $(`#${holder}`).css("height", innerHeightWithoutNav);
        }
      }
    }
    // [?] on load at ther realtime
    resizeContentHolder('sideMenuHolder');
  }
  // [#] COntrollers
  // [#] HTTP REQs
}
