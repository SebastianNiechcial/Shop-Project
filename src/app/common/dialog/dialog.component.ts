import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Login } from '../models/login';
import { Role } from '../models/role';
import { Router } from '@angular/router';
import { SessionStorageService } from '../services/sessionStorageService';
import { UserRestService } from '../services/user.service';

export interface DialogData {
  header?: string;
  message?: string;
  class?: string;
  isShowConfirmButton?: boolean;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  currentUser!: Login;
  roleCurrentUser!: string | undefined;

  constructor(
    private translate: TranslateService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private userRestService: UserRestService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  onConfirm(result: boolean) {
    this.dialogRef.close(result);
  }
}
