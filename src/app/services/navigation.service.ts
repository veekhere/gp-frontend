import { Injectable } from '@angular/core';
import { AppPathConstants } from '@app-constants';
import { ButtonSelectGroup } from '@core/components/inputs/button-select/domain/button-select-group.model';
import { ButtonSelectItem } from '@core/components/inputs/button-select/domain/button-select-item.model';
import { NotificationManagerService, NotificationStreamNode } from '@core/services/notification-manager.service';
import { Observable } from 'rxjs';

type NavigationMenuItem = {
  title: string;
  link: string;
  hasNotification$?: Observable<boolean>;
};

@Injectable({ providedIn: 'root' })
export class NavigationService {

  private readonly navigationMenu: NavigationMenuItem[] = [
    {
      title: 'NAVIGATION.HOME',
      link: AppPathConstants.HOME,
    },
    {
      title: 'NAVIGATION.DASHBOARD',
      link: AppPathConstants.DASHBOARD,
      hasNotification$: this.notificationManagerService.notificationStreams
        .get(NotificationStreamNode.Dashboard)?.asObservable(),
    },
    {
      title: 'NAVIGATION.ABOUT',
      link: AppPathConstants.ABOUT,
    },
  ];

  constructor(
    private readonly notificationManagerService: NotificationManagerService,
  ) {}

  get menu(): NavigationMenuItem[] {
    return this.navigationMenu;
  }

  get menuOptions(): ButtonSelectGroup[] {
    return [
      new ButtonSelectGroup({
        name: 'NAVIGATION.NAVIGATION',
        items:
          this.navigationMenu?.map((i) => {
            return new ButtonSelectItem({
              id: i?.link,
              name: i?.title,
              hasNotification$: i?.hasNotification$,
            });
          }),
      })
    ];
  }
}
