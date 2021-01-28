import { Component, OnInit } from '@angular/core';
import { NavigatorServicesService } from '../../services/navigator-services.service';

@Component({
  selector: 'app-navigations',
  templateUrl: './navigations.component.html',
  styleUrls: ['./navigations.component.css']
})
export class NavigationsComponent implements OnInit {

  constructor(public navService: NavigatorServicesService) { }

  ngOnInit(): void {
  }

}
