/**
 * @author: zhu.wenjian
 * @date: 3/4/19
 * @description:
 */
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {getToken} from '../auth/auth.service';
import {Injectable} from '@angular/core';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // todo
    const token: string  = getToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', token.slice(token.lastIndexOf('.') + 1))
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}

