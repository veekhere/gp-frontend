import { Injectable } from '@angular/core';
import { AppConstants } from '@app-constants';
import { ThemeEnum } from '@core/domain/enums/theme.enum';
import { LocalStorageService } from './local-storage.service';

/**
 * Сервис цветового оформления приложения.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {

  private readonly lightMap = new Map<string, string>([
    ['--text-default', '#0f0f0f'],
    ['--text-secondary', '#282828'],
    ['--text-default-hover', '#424242'],
    ['--text-default-inactive', '#888888'],
    ['--text-service', '#d2d2d2'],
    ['--text-service-hover', '#b4b4b4'],
    ['--bg-default', '#ececec'],
    ['--divider', '#dbdbdb'],
  ]);

  private readonly darkMap = new Map<string, string>([
    ['--text-default', '#f0f0f0'],
    ['--text-secondary', '#d7d7d7'],
    ['--text-default-hover', '#bdbdbd'],
    ['--text-default-inactive', '#777777'],
    ['--text-service', '#2d2d2d'],
    ['--text-service-hover', '#4b4b4b'],
    ['--bg-default', '#131313'],
    ['--divider', '#242424'],
  ]);

  constructor(
    private readonly localStorageService: LocalStorageService,
  ) {
    const savedTheme = localStorageService.getItem(AppConstants.KEYS.THEME);
    this.setTheme(savedTheme ?? ThemeEnum.Dark);
  }

  setTheme(theme: ThemeEnum): void {
    if (theme) {
      for (const [variable, color] of (theme === ThemeEnum.Dark ? this.darkMap : this.lightMap).entries()) {
        document.documentElement.style.setProperty(variable, color);
      }
      this.localStorageService.setItem(AppConstants.KEYS.THEME, theme);
    }
  }
}
