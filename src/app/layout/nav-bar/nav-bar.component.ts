import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Output() openSideMenu = new EventEmitter();
  constructor() { }
  devMood = false // var for Development Mood ! prduction 
  ngOnInit(): void {
  }

}
