import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { NotificationService } from '@core/services/notification.service';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {

  constructor(
    // private readonly auth: AuthService,
    private readonly notificationService: NotificationService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // if (this.auth.isLoggedIn && this.auth.isEmailConfirmed) {
    //   return true;
    // }
    // if (!this.auth.isLoggedIn) {
    //   this.notificationService.error('NOTIFICATION.NOT_AUTHORIZED');
    //   return false;
    // }
    // if (!this.auth.isEmailConfirmed) {
    //   this.notificationService.error('NOTIFICATION.EMAIL_IS_NOT_VERIFIED');
    //   return false;
    // }
    return true;
  }
}
