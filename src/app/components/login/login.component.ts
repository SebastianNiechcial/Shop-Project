import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserRestService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { group } from '@angular/animations';

import { DialogComponent } from '../../common/dialog/dialog.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private builder: FormBuilder,
    private userRestService: UserRestService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    console.log(group);
  }
  SubmitLoginDetails() {
    this.userRestService
      .login({
        login: this.form.controls['username'].value,
        password: this.form.controls['password'].value,
      })
      .subscribe(
        (dataResult) => {
          console.log('dataResult', dataResult);
          if (dataResult) {
          }
        },
        () => {
          this.dialog.open(DialogComponent, {
            data: {
              header: 'Błąd logowania',
              message: 'Nieprawidłowy login lub hasło',
              class: 'error-style',
            },
          });
        }
      );
  }
}
