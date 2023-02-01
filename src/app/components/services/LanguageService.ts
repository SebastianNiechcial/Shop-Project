import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  currentLanguage = 'en';
  currentFlag = 'us_Flag';

  constructor(
    private translate: TranslateService,
    private matIconRegistry: MatIconRegistry,
    private domSanitazer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'polish_Flag',
      this.domSanitazer.bypassSecurityTrustResourceUrl(
        '../../../assets/Icons/Polish_Flag.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'germany_Flag',
      this.domSanitazer.bypassSecurityTrustResourceUrl(
        '../../../assets/Icons/Germany_Flag.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'us_Flag',
      this.domSanitazer.bypassSecurityTrustResourceUrl(
        '../../../assets/Icons/Us_Flag.svg'
      )
    );
  }

  ChangeLanguage(language: string): void {
    switch (this.currentLanguage) {
      case 'en':
        this.currentFlag = 'polish_Flag';
        this.currentLanguage = 'pl';
        break;
      case 'pl':
        this.currentFlag = 'germany_Flag';
        this.currentLanguage = 'de';
        break;
      case 'de':
        this.currentFlag = 'us_Flag';
        this.currentLanguage = 'en';
        break;
    }
    this.translate.use(this.currentLanguage);
  }
}
