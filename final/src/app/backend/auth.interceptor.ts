import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { USERS } from './db';
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authToken = req.headers.get('Authorization');
  const authenticatedUser = USERS.find(user => user.token === authToken)
  if (!authenticatedUser) {
    throw new Error('Unauthorized');
  }

  const authReq = req.clone({
    setHeaders: {
      'X-User-Info': JSON.stringify(authenticatedUser)
    }
  });

  return next(authReq);
};