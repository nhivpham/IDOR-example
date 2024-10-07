import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user-service/user-service.component';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authToken = req.headers.get('Authorization');
  const userService = inject(UserService);
  const authenticatedUser = userService.getUserByToken(authToken || '');

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