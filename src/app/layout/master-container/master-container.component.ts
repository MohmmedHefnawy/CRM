import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-container',
  templateUrl: './master-container.component.html',
  styleUrls: ['./master-container.component.css']
})
export class MasterContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let holderWindowSize = (holder, sideMenu) => {// [?] holder is the selected holder <div> fo the component
      // [?] window reisze event | to resize holder every Browser winodw resize
      window.addEventListener("resize", function () {
        resizeContentHolder(holder);
        sideMenuMainHolder(sideMenu);
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
      // resize sideMenu
      function sideMenuMainHolder(elem) {
        var innerWidth = window.innerWidth;
        if (innerWidth > 1200) {
          $(elem).css("height", '100%');
        } else {
          $(elem).css("height", 'calc(100% - 3rem)');
        }
      }
      // [?] on load at ther realtime
      resizeContentHolder(holder);
      sideMenuMainHolder(sideMenu)
    }
    holderWindowSize('#masterContainer', '#sideMenuMainHolder')
  }
  // [#] Controllers
  toggelSideMenu(btn) {
    let toggleAttr = $(btn).attr('data-toggle')
    switch (toggleAttr) {
      case 'true': // open
        $('#sideMenuMainHolder').removeClass('col-xl-1')
        $('#sideMenuMainHolder').addClass('col-xl-2')
        $(btn).addClass("M0-arrow-in-icon")
        $(btn).removeClass("M0-arrow-out-icon")
        $(btn).attr('data-toggle', 'false')
        break
      case 'false': // remove
        $('#sideMenuMainHolder').removeClass('col-xl-2')
        $('#sideMenuMainHolder').addClass('col-xl-1')
        $(btn).addClass("M0-arrow-out-icon")
        $(btn).removeClass("M0-arrow-in-icon")
        $(btn).attr('data-toggle', 'true')
        break
    }
  }
  openMenu(btn) {
    let toggleAttr = $(btn).attr('data-toggle')
    switch (toggleAttr) {
      case 'true': // open
        $('#sideMenuMainHolder').removeClass('col-3')
        $('#sideMenuMainHolder').addClass('col-1')
        $(btn).addClass("M0-arrow-in-icon")
        $(btn).removeClass("M0-arrow-out-icon")
        $(btn).attr('data-toggle', 'false')
        break
      case 'false': // remove
        $('#sideMenuMainHolder').removeClass('col-1')
        $('#sideMenuMainHolder').addClass('col-3')
        $(btn).addClass("M0-arrow-out-icon")
        $(btn).removeClass("M0-arrow-in-icon")
        $(btn).attr('data-toggle', 'true')
        break
    }
  }
}
