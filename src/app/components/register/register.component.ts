import { Component } from '@angular/core';

interface ROLE {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  Roles: ROLE[] = [
    { value: '0', viewValue: 'Admin' },
    { value: '1', viewValue: 'User' },
    { value: '2', viewValue: 'Maintance' },
  ];
}
