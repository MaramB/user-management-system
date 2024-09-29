import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../services/error-handler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  role: string | null = null;
  currentUser: { name: string; email: string } | null = null;

  constructor(
    private authService: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.role = this.authService.getRole();
    this.authService.getCurrentUser().subscribe({
      next: (user: any) => {
        this.currentUser = user;
      },
      error: (error: any) => {
        this.errorHandler.handle(error.response);
      },
    });
  }

  navigateTo(view: string) {
    this.router.navigate([`/${view}`]);
  }
}
