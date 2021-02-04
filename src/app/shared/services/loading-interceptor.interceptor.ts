import { InLoadingService } from './in-loading.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  timer = new Date()

  constructor(public loadingServices: InLoadingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingServices.isLoading.next(true);
    console.log("Out :" + this.timer);
    return next.handle(request).pipe(
      finalize(
        () => {
          setTimeout(() => {
            this.loadingServices.isLoading.next(false);
            let datenow = new Date()
            console.log("Inside : " + datenow);
          }, 2000)
        }
      )
    )
  }
}
