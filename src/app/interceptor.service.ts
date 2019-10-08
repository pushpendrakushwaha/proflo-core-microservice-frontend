import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
  from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('proflo-user-token');
    // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVaWQiOiI1ZDhiNzg4NzA3M2E5MjAwMDE4NDZhMTEiLCJGaXJzdE5hbWUiOiJzdXJlc2giLCJMYXN0TmFtZSI6Imt1bWFyIiwiVXNlck5hbWUiOiJzdXJlc2gwMDciLCJQYXNzd29yZCI6IjI5ZjRkZjhjMDU0ZjQyNjI2ODhhMjMyNDcxZmI1ZTUwMzBiNjg3MjQiLCJFbWFpbCI6InN1cmVzaGt1bWFyMTIwNzRAZ21haWwuY29tIiwiYXZhdGFyIjpudWxsLCJCaW8iOm51bGx9.rk-7zCvZ4pQ3NC3Jh9DHIXejD2I82bTzhwSUHVPiZc8';
    const duplicate = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });
    return next.handle(duplicate);
  }
}
