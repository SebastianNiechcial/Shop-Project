import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, Validators } from '@angular/forms';
import { UrlSerializer } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRestService } from './../services/user.service';
import { Router } from '@angular/router';
import { group } from '@angular/animations';

export interface ROLE {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  submit() {}

  constructor(private fb: FormBuilder) {}

  functionclick() {}
  Roles: ROLE[] = [
    { value: '0', viewValue: 'Admin' },
    { value: '1', viewValue: 'User' },
    { value: '2', viewValue: 'Maintance' },
  ];
}
