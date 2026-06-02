import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  isRegistered(): boolean {
    return localStorage.getItem('registered') === 'true';
  }

  register(): void {
    localStorage.setItem('registered', 'true');
  }

  logout(): void {
    localStorage.removeItem('registered');
  }
}
