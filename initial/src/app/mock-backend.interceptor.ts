import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserService } from './user-service/user-service.component';

export const mockBackendInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const userService = inject(UserService);

  if (req.url.startsWith('/api/user/')) {
    return mockUserResponse(req, userService);
  }
  return next(req);
};

function mockUserResponse(request: HttpRequest<unknown>, userService: UserService): Observable<HttpEvent<unknown>> {
  const userId = request.url.split('/').pop();
  const user = userService.getUserById(userId || '');

  if (user) {
    return of(new HttpResponse({ status: 200, body: user }));
  } else {
    return of(new HttpResponse({ status: 404, body: { error: 'User not found' } }));
  }
}