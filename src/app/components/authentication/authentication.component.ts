import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthState, emailPattern } from '@app-constants';
import { FormUtils } from '@core/utils/form-utils';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationControlNames, AuthenticationModel } from './domain/authentication.model';

@UntilDestroy()
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationComponent implements OnInit, AfterViewInit {

  private readonly formGroup = new FormGroup({});
  private formData: AuthenticationModel = null;
  readonly controlNames = AuthenticationControlNames;
  readonly authState = AuthState;

  readonly actionButtonDisabled$ = new BehaviorSubject<boolean>(true);
  readonly authState$ = new BehaviorSubject<AuthState>(AuthState.SignUp);

  constructor(
    private readonly router: Router,
    // private readonly auth: AuthService,
  ) {
    this.authState$.next(this.router.getCurrentNavigation().extras.state?.['authState'] ?? AuthState.SignUp);
  }

  ngOnInit(): void {
    const controls = {
      [this.controlNames.EMAIL]: new FormControl(null, [
        Validators.required,
        Validators.pattern(emailPattern),
      ]),
      [this.controlNames.PASSWORD]: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    };
    FormUtils.addControls(this.formGroup, controls);
  }

  ngAfterViewInit(): void {
    this.spyOnFormChanges();
  }

  private spyOnFormChanges(): void {
    const email = this.getControl(this.controlNames.EMAIL);
    const password = this.getControl(this.controlNames.PASSWORD);

    this.formGroup.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.actionButtonDisabled$.next(!(email?.valid && password?.valid));
        this.formData = new AuthenticationModel(this.formGroup?.value);
      });
  }

  getControl(controlName: keyof AuthenticationModel): FormControl {
    return FormUtils.getControl(this.formGroup, controlName);
  }

  toggleAuthState(): void {
    this.authState$.next(this.authState$?.value === AuthState.SignUp ? AuthState.Login : AuthState.SignUp);
  }

  processAuth(): void {
    if (this.formGroup.valid) {
      // this.authState$.value === AuthState.SignUp
      // ? this.auth.signUp(this.formData?.email, this.formData?.password)
      // : this.auth.login(this.formData?.email, this.formData?.password);
    }
  }

  processGoogleAuth(): void {
    // this.auth.googleAuth();
  }

  forgotPassword(): void {
    // this.auth.forgotPassword(this.formData?.email)
    // .then(() => this.authState$.next(AuthState.Login));
  }
}
