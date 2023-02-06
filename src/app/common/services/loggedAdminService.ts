import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStorageService } from './sessionStorageService';

@Injectable()
export class LoggedAdminService implements CanActivate {
  constructor(private sessionStorageService: SessionStorageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return (
      this.sessionStorageService.getItem('currentUser') != null &&
      this.sessionStorageService.getItem('currentUser').role == 1
    );
  }
}
