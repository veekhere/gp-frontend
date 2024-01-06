import { Injectable } from '@angular/core';
import { AppConstants } from '@app-constants';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  getItem(key: string): any {
    const data = localStorage.getItem(this.keyMaker(key));
    return data ? JSON.parse(data) : null;
  }

  setItem(key: string, value: any): void {
    if (value) {
      localStorage.setItem(this.keyMaker(key), JSON.stringify(value));
    } else {
      localStorage.removeItem(this.keyMaker(key));
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(this.keyMaker(key));
  }

  private keyMaker(key: string): string {
    return [AppConstants.KEYS.LOCAL_STORAGE_PREFIX, key].join(': ');
  }
}
