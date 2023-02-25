import { Router, ActivatedRoute } from '@angular/router';
import { UserRestService } from '../../common/services/user.service';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from '../../common/services/LanguageService';
import { TranslateService } from '@ngx-translate/core';
import { Role } from '../../common/models/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  roleList!: Role[];
  currentFlag!: string;
  idUser!: number | null;

  constructor(
    private languageService: LanguageService,
    private fb: FormBuilder,
    private userRestService: UserRestService,
    private dialog: MatDialog,
    private router: Router,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {
    this.currentFlag = this.languageService.currentFlag;
  }

  ngOnInit(): void {
    this.idUser = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      login: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rptpassword: ['', [this.validPassword()]],
      role: ['', [Validators.required]],
    });
    this.userRestService.getRoles().subscribe((result) => {
      this.roleList = result as Role[];
    });

    if (this.idUser) {
      this.userRestService.getUser(this.idUser).subscribe((user) => {
        this.form.patchValue(user);
      });
    }
  }

  private validPassword(): ValidatorFn {
    return (control: AbstractControl) => {
      const controls = this.form ? this.form.controls : null;
      if (controls) {
        if (
          this.form.controls['password']?.value !=
            this.form.controls['rptPassword']?.value &&
          this.form.controls['password']?.dirty &&
          this.form.controls['rptPassword']?.dirty
        ) {
          setTimeout(() => {
            controls['rptPassword'].markAsTouched();
            controls['rptPassword'].markAsDirty();
            controls['rptPassword'].setErrors({ diffrentPassword: true });
          });
        }
      }
      return Validators.required(control);
    };
  }
  register() {
    const values = this.form.getRawValue();
    delete values.rptpassword;

    if (this.idUser) {
      delete values.passwordl;
      values.id = this.idUser;
    }

    (this.idUser
      ? this.userRestService.editUser(values)
      : this.userRestService.registrationUser(values)
    ).subscribe(
      (response) => {
        if (response === 'Added') {
          this.router.navigate(['../login']);
        }
      },
      () => {
        this.dialog.open(DialogComponent, {
          data: {
            header: this.translate.instant('translation.ErrorRegistration'),
            message: this.translate.instant(
              'translation.ErrorRegistrationMessage'
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
