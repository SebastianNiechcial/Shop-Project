import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rest } from './rest';

export interface LoginData {
  login: string;
  password: string;
}

export interface RegistrationData {
  login: string;
  name: string;
  lastName: string;
  password: string;
  role: number;
}

@Injectable()
export class UserRestService extends Rest {
  constructor(private http: HttpClient) {
    super();
  }

  login(data: LoginData) {
    return this.http.post(this.url + 'user/login', data);
  }

  getUser() {
    return this.http.get(this.url + 'user/roles');
  }

  registrationUser(data: RegistrationData) {
    return this.http.post(this.url + 'user/add', data);
  }
}
