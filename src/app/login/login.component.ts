import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  loginError = false;

  constructor(private authService: AuthService) {}

  login() {
    const isLoggedIn = this.authService.login(this.email, this.password);
    if (!isLoggedIn) {
      this.loginError = true;
    }
  }
}
