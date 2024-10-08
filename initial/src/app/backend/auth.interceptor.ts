import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { USERS } from './db';
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // todo: get request token
  const authenticatedUser = ""

  const authReq = req.clone({
    setHeaders: {
      'X-User-Info': JSON.stringify(authenticatedUser)
    }
  });

  return next(authReq);
};