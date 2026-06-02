import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly registrationStorageKey = 'registered';

  isRegistered(): boolean {
    return localStorage.getItem(this.registrationStorageKey) === 'true';
  }

  register(): void {
    localStorage.setItem(this.registrationStorageKey, 'true');
  }

  logout(): void {
    localStorage.removeItem(this.registrationStorageKey);
  }
}
