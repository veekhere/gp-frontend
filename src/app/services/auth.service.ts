import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '@core/domain/user.model';
import { LocalStorageService } from '@core/services/local-storage.service';
import { NotificationManagerService, NotificationStreamNode } from '@core/services/notification-manager.service';
import { NotificationService } from '@core/services/notification.service';
import { MessageUtils } from '@core/utils/message-utils';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AppConstants, AppPathConstants, AuthState } from 'src/app/app.constants';
import { animals, colors, uniqueNamesGenerator } from 'unique-names-generator';


@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private innerUser$ = new BehaviorSubject<User>(null);

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly router: Router,
    private readonly localStorage: LocalStorageService,
    private readonly notificationService: NotificationService,
    private readonly notificationManagerService: NotificationManagerService,
  ) {
    this.afAuth.authState.subscribe((fbUser) => {
      this.updateUser(fbUser);
      this.checkEmailVerification();
    });
  }

  private updateUser(fbUser: firebase.default.User): void {
    if (!!fbUser) {
      const user = User.toClientObject(fbUser);
      this.innerUser$.next(user);
      this.localStorage.setItem(AppConstants.KEYS.USER, user);
    } else {
      this.localStorage.removeItem(AppConstants.KEYS.USER);
    }
  }

  get user(): User {
    return User.toClientObject(this.localStorage.getItem(AppConstants.KEYS.USER));
  }

  get user$(): Observable<User> {
    return this.afAuth.user
      .pipe(
        map((fbUser) => {
          const user = User.toClientObject(fbUser);
          return user;
        }),
      );
  }

  get isLoggedIn(): boolean {
    return this.user !== null;
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.afAuth.authState
      .pipe(
        map((fbUser) => !!fbUser),
      );
  }

  get isEmailConfirmed(): boolean {
    return this.user?.emailVerified ?? false;
  }

  login(email: string, password: string): Promise<void> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result?.user) {
          this.router.navigate([AppPathConstants.EMPTY]);
        }
      })
      .catch((error) => {
        this.notificationService.error(MessageUtils.firebaseMessage(error.message));
      });
  }

  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        return result.user.updateProfile({
          displayName: uniqueNamesGenerator({
            dictionaries: [colors, animals],
            separator: '-',
            length: 2,
          }),
        });
      })
      .then(() => {
        const currentUser = this.afAuth.currentUser;
        currentUser
          .then((fbUser) => fbUser.reload())
          .then(() => {
            currentUser.then((fbUser) => {
              this.updateUser(fbUser);
              if (this.user) {
                this.router.navigate([AppPathConstants.EMPTY]);
              }
            });
          });
      })
      .catch((error) => {
        this.notificationService.error(MessageUtils.firebaseMessage(error.message));
      });
  }

  sendVerificationMail(): Promise<void> {
    return this.afAuth.currentUser
      .then((fbUser) => fbUser.sendEmailVerification())
      .then(() => {
        this.notificationService.success('AUTH.VERIFY_EMAIL_TEXT');
        this.spyOnEmailVerification();
      })
      .catch((error) => {
        this.notificationService.error(MessageUtils.firebaseMessage(error.message));
      });
  }

  private spyOnEmailVerification(): void {
    const currentUser = this.afAuth.currentUser;
    const timeLimit = Date.now() + AppConstants.EMAIL_VERIFICATION_COOLDOWN * 1000;
    const checkForVerifiedInterval = setInterval(() => {
      currentUser.then((fbUser) => fbUser.reload())
        .then(ok => {
          currentUser.then((fbUser) => {
            if (fbUser.emailVerified || (Date.now() > timeLimit)) {
              this.updateUser(fbUser);
              this.checkEmailVerification();
              this.notificationService.success('NOTIFICATION.EMAIL_VERIFICATION_SUCCESS');
              clearInterval(checkForVerifiedInterval);
            }
          });
        });
    }, 3000);
  }

  forgotPassword(passwordResetEmail: string): Promise<void> {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.notificationService.success('NOTIFICATION.PASSWORD_RESET_SEND');
      })
      .catch((error) => {
        this.notificationService.error(MessageUtils.firebaseMessage(error.message));
      });
  }

  googleAuth() {
    return this.authLogin(new GoogleAuthProvider()).then((res: any) => {
      this.router.navigate([AppPathConstants.EMPTY]);
    });
  }

  private authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .catch((error) => {
        // pass
      });
  }

  logout(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.localStorage.removeItem(AppConstants.KEYS.USER);
      this.router.navigate([AppPathConstants.AUTH], {
        state: {
          authState: AuthState.Login,
        }
      });
    });
  }

  // updateUserData(updatableData: Pick<User, 'expenseData'>): void {
  //   if (!this.isLoggedIn) {
  //     return;
  //   }
  //   this.user$.next(User.toClientObject({
  //     ...this.user$.value,
  //     ...updatableData,
  //   }));
  // }

  private checkEmailVerification(): void {
    const showNotification = !this.user ? false : !this.user?.emailVerified;
    this.notificationManagerService.notificationStreams.get(NotificationStreamNode.UserSettings)?.next(showNotification);
  }
}