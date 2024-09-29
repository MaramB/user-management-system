import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getRole();
    if (role === 'admin') {
      return true;
    } else if (!!role) {
      this.router.navigate(['/user']);
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
