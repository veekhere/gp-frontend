import { Injectable } from '@angular/core';
import { NotificationType } from '@core/domain/enums/notification-type.enum';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { Observable, first } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  constructor(
    private readonly notifierService: NotifierService,
    private readonly translateService: TranslateService,
  ) {}

  default(message: string, notificationId?: string): void {
    this.getTranslate(message)
      .subscribe((translatedMessage) =>
        this.notifierService.notify(NotificationType.Default, translatedMessage, notificationId)
      );
  }

  info(message: string, notificationId?: string): void {
    this.getTranslate(message)
      .subscribe((translatedMessage) =>
        this.notifierService.notify(NotificationType.Info, translatedMessage, notificationId)
      );
  }

  warning(message: string, notificationId?: string): void {
    this.getTranslate(message)
      .subscribe((translatedMessage) =>
        this.notifierService.notify(NotificationType.Warning, translatedMessage, notificationId)
      );
  }

  success(message: string, notificationId?: string): void {
    this.getTranslate(message)
      .subscribe((translatedMessage) =>
        this.notifierService.notify(NotificationType.Success, translatedMessage, notificationId)
      );
  }

  error(message: string, notificationId?: string): void {
    this.getTranslate(message)
      .subscribe((translatedMessage) =>
        this.notifierService.notify(NotificationType.Error, translatedMessage, notificationId)
      );
  }

  private getTranslate(message: string): Observable<any> {
    return this.translateService.get(message)
      .pipe(first());
  }
}
