import { Injectable } from '@angular/core';
import { AppConstants } from '@app-constants';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {

  getCookie(name: string): any {
    if (!name) {
      return null;
    }

    const cookieName = this.keyMaker(name) + "=";
    const cookies = decodeURIComponent(document.cookie).split('; ');

    for (const cookie of cookies) {
      const buffer = cookie;
      if (buffer.indexOf(cookieName) === 0) {
        const data = buffer.substring(cookieName.length, buffer.length);
        return data ? JSON.parse(data) : null;
      }
    }
    return null;
  }

  setCookie(name: string, value: any, lifetime?: number): void {
    if (!value || !name) {
      return;
    }

    const date = new Date();
    const year = 360 * 24 * 60 * 60 * 1000;
    date.setTime(date.getTime() + (lifetime ? lifetime : year));
    const expires = "expires=" + date.toUTCString();

    document.cookie = this.keyMaker(name) + "=" + JSON.stringify(value) + ";" + expires + ";path=/";
  }

  checkCookie(name: string): boolean {
    const cookie = this.getCookie(name);
    return cookie !== null;
  }

  private keyMaker(key: string): string {
    return AppConstants.KEYS.COOKIE_PREFIX + key?.toUpperCase();
  }
}
