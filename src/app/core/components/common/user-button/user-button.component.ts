import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { ButtonSelectGroup } from '@core/components/inputs/button-select/domain/button-select-group.model';
import { ButtonSelectItem } from '@core/components/inputs/button-select/domain/button-select-item.model';
import { UserAction, UserActionEnum } from '@core/domain/enums/user-action.enum';
import { exhaustiveCheck } from '@core/utils/check-utils';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { UserSettingsModalComponent } from '../user-settings-modal/user-settings-modal.component';
import { NotificationManagerService, NotificationStreamNode } from '@core/services/notification-manager.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { AppPathConstants, AuthState } from '@app-constants';

@UntilDestroy()
@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserButtonComponent implements OnInit {

  @ViewChild(UserSettingsModalComponent) modal: UserSettingsModalComponent;

  readonly data$ = new BehaviorSubject<ButtonSelectGroup[]>([]);

  constructor(
    // private readonly auth: AuthService,
    private readonly notificationManagerService: NotificationManagerService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    // this.auth.isLoggedIn$
    //   .pipe(untilDestroyed(this))
    //   .subscribe(() => {
    //     this.setOptions();
    //   });
  }

  onSelect(item?: ButtonSelectItem): void {
    const target = item?.id as UserActionEnum;
    switch (target) {
      case UserActionEnum.Settings: {
        this.modal.showDialog();
        break;
      }

      case UserActionEnum.Logout: {
        // this.auth.logout();
        break;
      }

      case UserActionEnum.Login: {
        this.router.navigate([AppPathConstants.AUTH], {
          state: {
            authState: AuthState.Login,
          }
        });
        break;
      }

      case UserActionEnum.SignUp: {
        this.router.navigate([AppPathConstants.AUTH], {
          state: {
            authState: AuthState.SignUp,
          }
        });
        break;
      }

      default: exhaustiveCheck(target, UserButtonComponent);
    }
  }

  userIsNotified(): Observable<boolean> {
    return this.notificationManagerService.hasNotifiedChild([
      this.notificationManagerService.notificationStreams.get(NotificationStreamNode.UserSettings),
    ]);
  }

  // private setOptions(): void {
  //   this.auth.user$
  //     .pipe(untilDestroyed(this))
  //     .subscribe((user) => {
  //       this.data$.next(
  //         this.auth.isLoggedIn ? [
  //           new ButtonSelectGroup({
  //             name: user?.displayName ?? 'Unknown user',
  //             items: [
  //               new ButtonSelectItem({
  //                 ...UserAction.toClientObject(UserActionEnum.Settings),
  //                 hasNotification$: this.notificationManagerService.notificationStreams
  //                   .get(NotificationStreamNode.UserSettings)?.asObservable()
  //               }),
  //               new ButtonSelectItem({
  //                 ...UserAction.toClientObject(UserActionEnum.Logout),
  //                 icon: 'tuiIconLogOut',
  //               }),
  //             ],
  //           }),
  //         ] : [
  //           new ButtonSelectGroup({
  //             name: 'NAVIGATION.USER.ACTIONS.GROUPS.AUTHENTICATION',
  //             items: [
  //               new ButtonSelectItem(UserAction.toClientObject(UserActionEnum.Login)),
  //               new ButtonSelectItem(UserAction.toClientObject(UserActionEnum.SignUp)),
  //             ],
  //           }),
  //         ]
  //       );
  //     });
  // }
}
