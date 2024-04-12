export type ClassConstructor = new (...args: any[]) => any;

export class AppConstants {
  static readonly KEYS = {
    LOCAL_STORAGE_PREFIX: 'VEEKHERE-RENTRATE: ',
    COOKIE_PREFIX: 'VEEKHERE_RENTRATE_',
    LANGUAGE: 'LANGUAGE',
    USER: 'USER',
  } as const;

  static readonly LANGUAGES = {
    EN: 'en',
    RU: 'ru',
  };

  static readonly MOSCOW = {
    latitude: 55.75206268045454,
    longitude: 37.61890599540003
  } as const;
}

export class AppPathConstants {
  static readonly EMPTY = '';
  static readonly WILDCARD = '**';

  static readonly HOME = 'home';
  static readonly DASHBOARD = 'dashboard';
  static readonly ABOUT = 'about';
}

export const emailPattern = /^[A-Z0-9]+([.]?[A-Z0-9]+)+@[A-Z0-9]+([.]{1}[A-Z0-9]+)*\.[A-Z0-9]+$/is;
