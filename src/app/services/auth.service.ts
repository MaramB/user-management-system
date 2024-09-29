import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = new BehaviorSubject<any>(null);

  private adminCredentials = { email: 'admin@example.com', name: 'Admin Admin', password: 'admin123' };
  private userCredentials = { email: 'user@example.com', name: 'User User', password: 'user123' };

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    // Check admin credentials
    if (email === this.adminCredentials.email && password === this.adminCredentials.password) {
      this.currentUser.next(this.adminCredentials);
      localStorage.setItem('user', JSON.stringify(this.adminCredentials));
      localStorage.setItem('role', 'admin');
      this.router.navigate(['/']);
      return true;
    }
    
    // Check user credentials
    if (email === this.userCredentials.email && password === this.userCredentials.password) {
      this.currentUser.next(this.userCredentials);
      localStorage.setItem('user', JSON.stringify(this.userCredentials));
      localStorage.setItem('role', 'user');
      this.router.navigate(['/']);
      return true;
    }

    return false; // Invalid credentials
  }

  logout() {
    this.currentUser.next(null);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  getCurrentUser() {
    return this.currentUser.asObservable();
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAuthenticated(): boolean {
    return !!this.currentUser.value;
  }
}
