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
        sideMenuMainHolder('#sideMenuMainHolderMob');
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
      sideMenuMainHolder('#sideMenuMainHolderMob');
    }
    holderWindowSize('#masterContainer', '#sideMenuMainHolder')
  }
  // [#] Controllers
  toggelSideMenu(e, holder) {
    let toggleAttr = $(e[1]).attr('data-toggle')
    switch (toggleAttr) {
      case 'true': // open
        $(`#${holder}`).removeClass('col-xl-1')
        $(`#${holder}`).addClass('col-xl-2')
        $(`#${holder}`).removeClass('col-1')
        $(`#${holder}`).addClass('col-3')
        $(e[0]).addClass("M0-arrow-in-icon")
        $(e[0]).removeClass("M0-arrow-out-icon")
        $(e[1]).attr('data-toggle', 'false')
        break
      case 'false': // close
        $(`#${holder}`).removeClass('col-xl-2')
        $(`#${holder}`).addClass('col-xl-1')
        $(`#${holder}`).removeClass('col-3')
        $(`#${holder}`).addClass('col-1')
        $(e[0]).addClass("M0-arrow-out-icon")
        $(e[0]).removeClass("M0-arrow-in-icon")
        $(e[1]).attr('data-toggle', 'true')
        break
    }
  }
  openMenu(e, holder) {
    let toggleAttr = $(e[1]).attr('data-toggle')
    switch (toggleAttr) {
      case 'false': // close
        $(`#${holder}`).removeClass('col-3')
        $(`#${holder}`).addClass('col-1')
        $(`#${holder}`).removeClass('col-xl-2')
        $(`#${holder}`).addClass('col-xl-1')
        $(e[0]).addClass("M0-arrow-in-icon")
        $(e[0]).removeClass("M0-arrow-out-icon")
        $(e[1]).attr('data-toggle', 'true')
        break
      case 'true': // open
        $(`#${holder}`).removeClass('col-1')
        $(`#${holder}`).addClass('col-3')
        $(`#${holder}`).removeClass('col-xl-1')
        $(`#${holder}`).addClass('col-xl-2')
        $(e[0]).addClass("M0-arrow-out-icon")
        $(e[0]).removeClass("M0-arrow-in-icon")
        $(e[1]).attr('data-toggle', 'false')
        break
    }
  }
  openMobileMenu(btn, holder) {
    let toggleAttr = $(btn).attr('data-toggle')
    switch (toggleAttr) {
      case 'true': // close
        $(`#${holder}`).removeClass('col-md-4 col-8')
        $(`#${holder}`).addClass('col-md-1 col-3')
        setTimeout(() => { $(`#${holder}`).addClass('d-none'); $(`#${holder}`).removeClass('d-block')},170)
        $(btn).addClass("M0-arrow-in-icon")
        $(btn).removeClass("M0-arrow-out-icon")
        $(btn).attr('data-toggle', 'false')
        break
      case 'false': // open
        $(`#${holder}`).addClass('d-block');
        $(`#${holder}`).removeClass('d-none')
      setTimeout(() => { 
        $(`#${holder}`).removeClass('col-md-1 col-3')
        $(`#${holder}`).addClass('col-md-4 col-8')
      },0) 
        $(btn).addClass("M0-arrow-out-icon")
        $(btn).removeClass("M0-arrow-in-icon")
        $(btn).attr('data-toggle', 'true')
        break
    }
  }
}
