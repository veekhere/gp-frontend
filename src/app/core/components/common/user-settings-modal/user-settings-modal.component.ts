import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppConstants } from '@app-constants';
import { AuthService } from '@app/services/auth.service';
import { User } from '@core/domain/user.model';
import { CookiesService } from '@core/services/cookies.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TuiDialogService } from '@taiga-ui/core';
import { BehaviorSubject, Observable, interval, takeWhile } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-user-settings-modal',
  templateUrl: './user-settings-modal.component.html',
  styleUrls: ['./user-settings-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsModalComponent implements OnInit {

  @ViewChild('modalTemplate') modalTemplate: TemplateRef<any>;

  user$: Observable<User>;
  readonly buttonDisabled$ = new BehaviorSubject<boolean>(false);
  readonly timeRemaining$ = new BehaviorSubject<number>(null);

  private readonly COOKIE_COOLDOWN_FLAG = 'EMAIL_CONFIRMATION_COOLDOWN';
  private readonly coolDown = AppConstants.EMAIL_VERIFICATION_COOLDOWN;

  constructor(
    // private readonly auth: AuthService,
    private readonly dialogService: TuiDialogService,
    private readonly cookiesService: CookiesService,
  ) {
    // this.user$ = this.auth.user$.pipe(untilDestroyed(this));
  }

  ngOnInit(): void {
    const cookieCoolDown: number = this.cookiesService.getCookie(this.COOKIE_COOLDOWN_FLAG);
    if (cookieCoolDown) {
      const realCoolDown = cookieCoolDown - Date.now();
      this.startCountdown(Math.round(realCoolDown / 1000));
    }
  }

  showDialog(): void {
    this.dialogService.open(this.modalTemplate).subscribe();
  }

  resendConfirmation(): void {
    this.cookiesService.setCookie(this.COOKIE_COOLDOWN_FLAG, Date.now() + this.coolDown * 1000, this.coolDown * 1000);
    // this.auth.sendVerificationMail();
    this.startCountdown(this.coolDown);
  }

  private startCountdown(timeOffsetInSeconds: number): void {
    const end = Date.now() + timeOffsetInSeconds * 1000;
    this.timeRemaining$.next(timeOffsetInSeconds);
    this.buttonDisabled$.next(true);

    interval(1000)
      .pipe(
        takeWhile(() => this.cookiesService.checkCookie(this.COOKIE_COOLDOWN_FLAG), true),
      )
      .subscribe(() => {
        this.timeRemaining$.next(Math.round((end - Date.now()) / 1000));
        this.buttonDisabled$.next(this.cookiesService.checkCookie(this.COOKIE_COOLDOWN_FLAG));
      });
  }
}
