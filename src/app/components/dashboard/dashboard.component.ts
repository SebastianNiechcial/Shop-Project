import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from '../services/LanguageService';
import { TranslateService } from '@ngx-translate/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy {
  currentFlag!: string;
  showFiller = false;

  //add user list here
  fillerNav = Array.from({ length: 16 }, (_, i) => `User ${i + 1}`);

  constructor(
    changeDetectorRef: ChangeDetectorRef,

    private languageService: LanguageService,
    private matIconRegistry: MatIconRegistry,
    private domSanitazer: DomSanitizer,
    private translate: TranslateService
  ) {
    this.currentFlag = this.languageService.currentFlag;
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  changeLanguage(language: string): void {
    this.languageService.ChangeLanguage(language);
    this.currentFlag = this.languageService.currentFlag;
  }
}
