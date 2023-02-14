import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Login } from '../../models/login';
import { Role } from '../../models/role';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../services/sessionStorageService';
import { UserRestService } from '../../services/user.service';
import { MatDialogModule } from '@angular/material/dialog';

export interface DialogData {
  header?: string;
  message?: string;
  class?: string;
}

@Component({
  selector: 'app-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.scss'],
})
export class DeleteFormComponent {
  currentUser!: Login;
  roleCurrentUser!: string | undefined;

  constructor(
    private sessionStorageService: SessionStorageService,

    private userRestService: UserRestService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.sessionStorageService.getItem('currentUser');
    this.userRestService.getRoles().subscribe((result) => {
      this.roleCurrentUser = (result as Role[]).find(
        (item) => item.id === this.currentUser.role
      )?.name;
    });
  }
}
