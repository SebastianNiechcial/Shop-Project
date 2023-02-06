import { Injectable } from '@angular/core';

@Injectable()
export class RoleService {
  isAdmin: boolean = false;
  isUser: boolean = false;
  isSeller: boolean = false;

  setRole(role: number) {
    this.isAdmin = role == 1;
    this.isUser = role == 2;
    this.isSeller = role == 3;
  }
  onRoleSet() {
    return !this.isAdmin && !this.isUser && !this.isSeller;
  }
}
