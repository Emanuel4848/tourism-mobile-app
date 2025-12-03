import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth-guard';  
import { AuthService } from '../services/auth';


class AuthServiceMock {
  isAuthenticated() {
    return true; 
  }
}
describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authServiceMock: AuthServiceMock;
  let routerMock: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: AuthServiceMock }, 
        { provide: Router, useValue: { navigate: jasmine.createSpy() } } 
      ]
    });
    authGuard = TestBed.inject(AuthGuard);
    authServiceMock = TestBed.inject(AuthService); 
    routerMock = TestBed.inject(Router);  
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy(); 
  });
});
