import { Component, NgModule, ViewChild } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserRestService } from '../../../common/services/user.service';
import { SessionStorageService } from '../../../common/services/sessionStorageService';
import { UserList } from 'src/app/common/models/userData';
import { Role } from 'src/app/common/models/role';
import { forkJoin } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatIconRegistry } from '@angular/material/icon';
import { TranslateService } from '@ngx-translate/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
})
export class UserlistComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'lastName', 'login', 'role', 'action'];
  dataSource: MatTableDataSource<UserList> = new MatTableDataSource<UserList>();
  roleList!: Role[];

  constructor(
    private userRestService: UserRestService,
    private sessionStorageService: SessionStorageService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.userRestService.userAll(),
      this.userRestService.getUser(),
    ]).subscribe((data) => {
      this.dataSource.data = data[0] as UserList[];
      this.roleList = data[1] as Role[];
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getRole(id: number) {
    return this.roleList.find((role) => role.id === id)?.name;
  }

  onEdit() {
    console.log('edit');
  }

  onDelete() {
    console.log('delete');
  }
}
