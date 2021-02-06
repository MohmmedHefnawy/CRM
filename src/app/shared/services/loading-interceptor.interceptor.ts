// import { InLoadingService } from './in-loading.service';
// import { Injectable } from '@angular/core';

// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { finalize } from 'rxjs/operators';

// @Injectable()
// export class LoadingInterceptor implements HttpInterceptor {

//   constructor(public loadingServices: InLoadingService) { }

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     // this.loadingServices.loader.start()
//     console.log(next);

//     return next.handle(request)
//     // .pipe(
//     //   finalize(() => {
//     //     this.loadingServices.loader.complete()
//     //   }
//     //   )
//     // )
//   }
// }


