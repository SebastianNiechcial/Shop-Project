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
export class LoggedUserService implements CanActivate {
  constructor(private sessionStorageService: SessionStorageService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return (
      (this.sessionStorageService.getItem('currentUser') != null &&
        this.sessionStorageService.getItem('currentUser').role == 2) ||
      this.sessionStorageService.getItem('currentUser').role == 3
    );
  }
}
