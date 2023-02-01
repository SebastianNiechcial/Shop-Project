import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRestService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { group } from '@angular/animations';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from '../services/LanguageService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  currentFlag!: string;

  constructor(
    private languageService: LanguageService,
    private matIconRegistry: MatIconRegistry,
    private domSanitazer: DomSanitizer,
    private builder: FormBuilder,
    private userRestService: UserRestService,
    private dialog: MatDialog,
    private router: Router,
    private translate: TranslateService
  ) {
    this.currentFlag = this.languageService.currentFlag;
  }

  ngOnInit(): void {
    this.form = this.builder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.translate.setDefaultLang('pl');
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
              header: this.translate.instant('translation.Error_Login'),
              message: this.translate.instant(
                'translation.Error_Login_Message'
              ),
              class: 'error-style',
            },
          });
        }
      );
  }
  changeLanguage(language: string): void {
    this.languageService.ChangeLanguage(language);
    this.currentFlag = this.languageService.currentFlag;
  }
}
