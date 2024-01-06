export type ClassConstructor = new (...args: any[]) => any;

export enum AuthState {
  Login = 'login',
  SignUp = 'signUp',
  ForgotPassword = 'forgotPassword',
}

export class AppConstants {
  static readonly KEYS = {
    LOCAL_STORAGE_PREFIX: 'VEEKHERE-RATERENT: ',
    COOKIE_PREFIX: 'VEEKHERE_RATERENT_',
    LANGUAGE: 'LANGUAGE',
    USER: 'USER',
  } as const;

  static readonly LANGUAGES = {
    EN: 'en',
    RU: 'ru',
  };

  static readonly EMAIL_VERIFICATION_COOLDOWN = 90;
  static readonly MOSCOW = {
    latitude: 55.75206268045454,
    longitude: 37.61890599540003
  } as const;
}

export class AppPathConstants {
  static readonly EMPTY = '';
  static readonly WILDCARD = '**';
  static readonly AUTH = 'auth';
  static readonly EMAIL_CONFIRMATION = 'confirm-email-address';

  static readonly HOME = 'home';
  static readonly DASHBOARD = 'dashboard';
  static readonly ACCOUNT = 'account';
  static readonly ABOUT = 'about';
}

export const emailPattern = /^[A-Z0-9]+([.]?[A-Z0-9]+)+@[A-Z0-9]+([.]{1}[A-Z0-9]+)*\.[A-Z0-9]+$/is;
