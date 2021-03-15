import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRequest } from './edituser/register.model';
import { User } from './edituser/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  register(request: UserRequest) {
    return this.httpClient.post('http://localhost:8080/register', request);
  }

  login(request: UserRequest) {
    return this.httpClient.post('http://localhost:8080/login', request);
  }
}