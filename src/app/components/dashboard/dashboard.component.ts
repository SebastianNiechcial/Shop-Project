import { Component, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from '../../common/services/LanguageService';
import { TranslateService } from '@ngx-translate/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SessionStorageService } from 'src/app/common/services/sessionStorageService';
import { Login } from 'src/app/common/models/login';
import { UserRestService } from 'src/app/common/services/user.service';
import { Role } from 'src/app/common/models/role';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;
  currentFlag!: string;
  showFiller = false;

  roleCurrentUser!: string | undefined;
  currentUser!: Login;
  prefix!: string;
  fillerNav = Array.from({ length: 16 }, (_, i) => `User ${i + 1}`);

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    private sessionStorageService: SessionStorageService,
    private languageService: LanguageService,
    private matIconRegistry: MatIconRegistry,
    private domSanitazer: DomSanitizer,
    private translate: TranslateService,
    private userRestService: UserRestService,
    private router: Router
  ) {
    this.currentFlag = this.languageService.currentFlag;
  }
  ngOnInit(): void {
    this.currentUser = this.sessionStorageService.getItem('currentUser');
    this.userRestService.getRoles().subscribe((result) => {
      this.roleCurrentUser = (result as Role[]).find(
        (item) => item.id === this.currentUser.role
      )?.name;
    });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  changeLanguage(language: string): void {
    this.languageService.ChangeLanguage(language);
    this.currentFlag = this.languageService.currentFlag;
  }
  logout() {
    this.sessionStorageService.clear();
    this.router.navigate(['../login']);
  }
  onMenuClick(prefix: string) {
    this.sidenav.close();
    this.prefix = prefix;
  }
}
