import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NotificationService } from './notification.service';

/**
 * Error handler service.
 */
@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {

  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  handleError(error: Error): Observable<any> {
    console.log(error?.message);
    this.notificationService.error(error?.message);
    return of(null);
  }
}
