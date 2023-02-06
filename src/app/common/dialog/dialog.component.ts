import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Login } from '../models/login';
import { Role } from '../models/role';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { SessionStorageService } from '../services/sessionStorageService';
import { UserRestService } from '../services/user.service';

export interface DialogData {
  header?: string;
  message?: string;
  class?: string;
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

  ngOnInit(): void {
    this.sessionStorageService.getItem('currentUser');
    this.userRestService.getUser().subscribe((result) => {
      this.roleCurrentUser = (result as Role[]).find(
        (item) => item.id === this.currentUser.role
      )?.name;
    });
  }
}
