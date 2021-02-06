import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingBarService } from '@ngx-loading-bar/core';


@Injectable({
  providedIn: 'root'
})
export class InLoadingService implements OnInit {
  loader = this.loadingBar.useRef('http');
  value$ = this.loadingBar.value$
  // public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)

  constructor(public loadingBar: LoadingBarService) {

  }

  ngOnInit(): void {
  }
}
