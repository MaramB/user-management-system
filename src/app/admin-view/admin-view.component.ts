import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from '../services/user.service';
import { ErrorHandlerService } from '../services/error-handler';

@Component({
  selector: 'app-admin',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css'],
})
export class AdminViewComponent implements OnInit, OnDestroy {
  users: any[] = [];
  loading: boolean = true;
  editMode: boolean = false;
  editUserForm: FormGroup;
  selectedUserId: number | null = null;

  // Subject used to trigger unsubscription
  private unsubscribe$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private errorHandler: ErrorHandlerService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.editUserForm = this.fb.group({
      name: [''],
      email: [''],
    });
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true
    this.userService
      .getUsers()
      .pipe(takeUntil(this.unsubscribe$)) // Automatically unsubscribes on component destroy
      .subscribe({
        next: (data: any[]) => {
          this.users = data;
        },
        error: (error: any) => {
          this.errorHandler.handle(error);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  addUser() {
    const newUser = {
      name: 'New User',
      email: 'newuser@example.com',
    };
    this.userService
      .addUser(newUser)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (users: any[]) => {
          this.users.push(users);
        },
        error: (error: any) => {
          this.errorHandler.handle(error);
        },
      });
  }

  editUser(user: any) {
    this.selectedUserId = user.id;
    this.editUserForm.patchValue({
      name: user.name,
      email: user.email,
    });
    this.editMode = true;
  }

  submitEdit() {
    if (this.selectedUserId) {
      this.userService
        .editUser(this.selectedUserId, this.editUserForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: () => {
            const index = this.users.findIndex(
              (user) => user.id === this.selectedUserId
            );
            this.users[index] = {
              ...this.users[index],
              ...this.editUserForm.value,
            };
            this.editMode = false;
            this.selectedUserId = null;
          },
          error: (error: any) => {
            this.errorHandler.handle(error.response);
          },
        });
    }
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService
        .deleteUser(userId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: () => {
            this.users = this.users.filter((user) => user.id !== userId);
          },
          error: (error: any) => {
            this.errorHandler.handle(error.response);
          },
        });
    }
  }

  viewAsUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/user']);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
