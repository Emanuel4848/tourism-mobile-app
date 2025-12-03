import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse, AuthUser } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth';
  private storageKey = 'user';
  private currentUser: AuthUser | null = null;

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        this.currentUser = JSON.parse(saved) as AuthUser;
      } catch {
        this.currentUser = null;
        localStorage.removeItem(this.storageKey);
      }
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((res) => {
          const user: AuthUser = { id: res.id, email: res.email };
          this.currentUser = user;
          localStorage.setItem(this.storageKey, JSON.stringify(user));
        })
      );
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem(this.storageKey);
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  getUser(): AuthUser | null {
    return this.currentUser;
  }
}
