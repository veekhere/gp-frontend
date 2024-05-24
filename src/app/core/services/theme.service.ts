import { Injectable } from '@angular/core';
import { AppConstants } from '@app-constants';
import { ThemeEnum } from '@core/domain/enums/theme.enum';
import { CommonUtils } from '@core/utils/common-utils';
import { LocalStorageService } from './local-storage.service';

/**
 * Сервис цветового оформления приложения.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {

  private readonly colors = new Map<string, string>([

    // Базовые цвета приложения.

    ['--bg-default', '#131313'],
    ['--bg-secondary', '#222222'],
    ['--divider', '#242424'],
    ['--hover-overlay', '#ffffff08'],
    ['--text-default', '#f0f0f0'],
    ['--text-default-hover', '#bdbdbd'],
    ['--text-default-inactive', '#777777'],
    ['--text-secondary', '#d7d7d7'],
    ['--text-service', '#2d2d2d'],
    ['--text-service-hover', '#4b4b4b'],
    ['--text-service-hover', '#4b4b4b'],

    // Цвета UI-kit'а (Dark).

    ['--tui-accent-text', '#ffffff'],
    ['--tui-autofill', '#554a2a'],
    ['--tui-autofill-night', '#554a2a'],
    ['--tui-base-01', '#222222'],
    ['--tui-base-02', '#333333'],
    ['--tui-base-03', '#808080'],
    ['--tui-base-04', '#959595'],
    ['--tui-base-05', '#b0b0b0'],
    ['--tui-base-06', '#d7d7d7'],
    ['--tui-base-07', '#ededed'],
    ['--tui-base-08', '#f6f6f6'],
    ['--tui-base-09', '#ffffff'],
    ['--tui-clear', '#ffffff29'],
    ['--tui-clear-active', '#ffffff66'],
    ['--tui-clear-disabled', '#ffffff14'],
    ['--tui-clear-hover', '#ffffff3d'],
    ['--tui-elevation-01', '#222222'],
    ['--tui-elevation-02', '#222222'],
    ['--tui-focus', '#333333a3'],
    ['--tui-neutral-bg', '#959ba452'],
    ['--tui-neutral-bg-hover', '#959ba47a'],
    ['--tui-neutral-bg-night', '#959ba452'],
    ['--tui-neutral-bg-night-hover', '#959ba47a'],
    ['--tui-neutral-fill', '#959ba4'],
    ['--tui-neutral-fill-night', '#959ba4'],
    ['--tui-secondary', '#ffffff29'],
    ['--tui-secondary-active', '#ffffff66'],
    ['--tui-secondary-hover', '#ffffff3d'],
    ['--tui-text-01', '#ffffff'],
    ['--tui-text-01-night', '#ffffff'],
    ['--tui-text-02', '#ffffffb8'],
    ['--tui-text-02-night', '#ffffffb8'],
    ['--tui-text-03', '#ffffff99'],
    ['--tui-text-03-night', '#ffffff99'],
  ]);

  constructor(
    private readonly localStorageService: LocalStorageService,
  ) {
    const savedTheme = localStorageService.getItem(AppConstants.KEYS.THEME);
    this.setTheme(savedTheme ?? ThemeEnum.Dark);
  }

  setTheme(theme: ThemeEnum): void {
    if (theme) {
      for (const [variable, color] of this.colors.entries()) {
        document.documentElement.style.setProperty(variable, (theme === ThemeEnum.Dark ? color : this.invert(color)));
      }
      this.localStorageService.setItem(AppConstants.KEYS.THEME, theme);
    }
  }

  private invert(hexColor: string): string {
    const rgbColor = CommonUtils.hexToRGB(hexColor);
    if (rgbColor) {
      rgbColor.r = 255 - rgbColor.r;
      rgbColor.g = 255 - rgbColor.g;
      rgbColor.b = 255 - rgbColor.b;
    }
    return CommonUtils.RGBToHex(rgbColor);
  }
}
