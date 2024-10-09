import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { USERS } from './db';

function getUserById(userId: string) {
  const user = USERS.find(user => user.id === userId)
  return user || null
}


export const mockBackendInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  if (req.url.startsWith('/api/user/')) {
    const segments = req.url.split('/')
    if(segments.length !== 4) {
      return next(req);
    }

    return mockUserResponse(req);
  }
  return next(req);
};

function mockUserResponse(request: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
  const userId = request.url.split('/').pop() || "";
  const authenticatedUserInfo = JSON.parse(request.headers.get('X-User-Info') || '{}');

  // todo: deny access to prevent IDOR

  if(request.method === "GET") {
    const user = getUserById(userId);

    if (user) {
      return of(new HttpResponse({ status: 200, body: { user } }));
    } else {
      return throwError(new HttpResponse({ status: 404, body: { error: 'User not found' } }));
    }
  }

    return throwError(new HttpResponse({ status: 500, body: { error: 'Unexpected error occured' } })); 
}