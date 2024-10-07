# IDOR-example

IDOR Mitigation: AngularJS vs Angular Implementation (Claude generated)

1. AngularJS Implementation

* Uses real Express backend
* Authentication via authenticate middleware on server
* Authorization in /api/user/:id route on server
* Frontend sends auth token with requests

2. Angular Implementation

* Simulates backend with interceptors
* Token management in UserService (frontend)
* Authentication simulated via authInterceptor
* Authorization simulated in mockBackendInterceptor

3. Similarities

* Demonstrate token-based authentication
* Implement user-specific data access control
* Handle errors for unauthorized access
* Protect frontend routes

4. Key Differences

* Real backend vs simulated backend layer
* Server-side vs simulated security checks
* Separation of concerns (clear in AngularJS, blurred in Angular)