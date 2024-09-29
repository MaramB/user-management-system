import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addUser(newUser: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newUser);
  }

  editUser(userId: number, updatedUser: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${userId}`, updatedUser);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}
