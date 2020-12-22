import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crm';
  // [#] Controllers
  toggelSideMenu(btn){
    let toggleAttr = $(btn).attr('data-toggle')
    console.log(toggleAttr);
    switch (toggleAttr){
      case 'true': // open
        $('#sideMenuMainHolder').removeClass('col-1')
        $('#sideMenuMainHolder').addClass('col-3')
        $(btn).addClass("M0-arrow-in-icon")
        $(btn).removeClass("M0-arrow-out-icon")
        $(btn).attr('data-toggle', 'false')
        break
      case 'false': // remove
        $('#sideMenuMainHolder').removeClass('col-3')
        $('#sideMenuMainHolder').addClass('col-1')
        $(btn).addClass("M0-arrow-out-icon")
        $(btn).removeClass("M0-arrow-in-icon")
        $(btn).attr('data-toggle', 'true')
        break
    }
  }
}
