import { Component, NgModule, ViewChild } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserRestService } from '../../../common/services/user.service';
import { SessionStorageService } from '../../../common/services/sessionStorageService';
import { UserList } from 'src/app/common/models/userData';
import { Role } from 'src/app/common/models/role';
import { forkJoin, BehaviorSubject, switchMap } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatIconRegistry } from '@angular/material/icon';
import { TranslateService } from '@ngx-translate/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { Sort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/common/dialog/dialog.component';
import { LanguageService } from 'src/app/common/services/LanguageService';
import { Router } from '@angular/router';

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
  sortedData!: UserList[];
  formInit$!: BehaviorSubject<boolean>;

  constructor(
    private userRestService: UserRestService,
    private sessionStorageService: SessionStorageService,
    private translateService: TranslateService,
    private dialog: MatDialog,
    private languageService: LanguageService,
    private router: Router
  ) {
    this.dataSource.sort = this.sort;
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'lastName':
          return this.compare(a.lastName, b.lastName, isAsc);
        case 'login':
          return this.compare(a.login, b.login, isAsc);
        case 'role':
          return this.compare(a.role, b.role, isAsc);
        default:
          return 0;
      }
    });

    this.dataSource.data = this.sortedData;
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngOnInit() {
    this.formInit$ = new BehaviorSubject<boolean>(true);
    this.formInit$
      .pipe(
        switchMap(() =>
          forkJoin([
            this.userRestService.userAll(),
            this.userRestService.getRoles(),
          ])
        )
      )
      .subscribe((data) => {
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

  editUser(element: UserList) {
    this.router.navigate(['../edit-user', element.id]);
  }

  onDelete(element: UserList) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        header: this.translateService.instant('USER_LIST.DIALOG.HEADER'),
        message: this.translateService.instant('USER_LIST.DIALOG.MESSAGE'),
        isShowConfirmButton: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userRestService.deleteUser(element.id).subscribe(
          () => {
            this.formInit$.next(true);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }
}
