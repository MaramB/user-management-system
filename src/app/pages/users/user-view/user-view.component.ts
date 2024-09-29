import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  user: any;
  editMode: boolean = false;
  editUserForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editUserForm = this.fb.group({
      name: [''],
      email: ['']
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : null;

    if (this.user) {
      this.editUserForm.patchValue({
        name: this.user.name,
        email: this.user.email
      });
    }
  }

  editUser() {
    this.editMode = true;
  }

  submitEdit() {
    this.user.name = this.editUserForm.value.name;
    this.user.email = this.editUserForm.value.email;

    localStorage.setItem('user', JSON.stringify(this.user));

    this.editMode = false;
  }

  cancelEdit() {
    this.editMode = false;
  }
}
