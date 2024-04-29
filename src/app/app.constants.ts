export type ClassConstructor = new (...args: any[]) => any;

export const FETCH_POLICY_NETWORK_ONLY = 'network-only';
export const FETCH_POLICY_NO_CACHE = 'no-cache';

export class AppConstants {
  static readonly KEYS = {
    LOCAL_STORAGE_PREFIX: 'VEEKHERE-RENTRATE: ',
    COOKIE_PREFIX: 'VEEKHERE_RENTRATE_',
    LANGUAGE: 'LANGUAGE',
    THEME: 'THEME'
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

  static readonly FIND = 'find';
  static readonly ADD = 'add';
  static readonly ABOUT = 'about';
}

export const emailPattern = /^[A-Z0-9]+([.]?[A-Z0-9]+)+@[A-Z0-9]+([.]{1}[A-Z0-9]+)*\.[A-Z0-9]+$/is;
