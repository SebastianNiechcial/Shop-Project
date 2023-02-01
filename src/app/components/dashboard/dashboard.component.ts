import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitazer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'polish_Flag',
      this.domSanitazer.bypassSecurityTrustResourceUrl(
        '../../../assets/Icons/Polish_Flag.svg'
      )
    );
  }
}
