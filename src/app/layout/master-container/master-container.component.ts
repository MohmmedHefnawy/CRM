import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-container',
  templateUrl: './master-container.component.html',
  styleUrls: ['./master-container.component.css']
})
export class MasterContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let holderWindowSize = (holder) => {// [?] holder is the selected holder <div> fo the component
      // [?] window reisze event | to resize holder every Browser winodw resize
      window.addEventListener("resize", function () {
        resizeContentHolder(holder);
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
            $(elem).css("height", 700);
          }
        }
      }
      // [?] on load at ther realtime
      resizeContentHolder(holder);
    }
    holderWindowSize('#masterContainer')
  }
}
