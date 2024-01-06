import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

export enum NotificationStreamNode {
  UserSettings = 'userSettings',
  Dashboard = 'dashboard',
}

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class NotificationManagerService {

  readonly notificationStreams = new Map<NotificationStreamNode, BehaviorSubject<boolean>>([
    [NotificationStreamNode.UserSettings, new BehaviorSubject(false)],
    [NotificationStreamNode.Dashboard, new BehaviorSubject(false)],
  ]);

  hasNotifiedChild(children: BehaviorSubject<boolean>[]): Observable<boolean> {
    return combineLatest([...children])
      .pipe(
        map((arr) => !!arr?.find((e) => !!e)),
        untilDestroyed(this)
      );
  }
}
