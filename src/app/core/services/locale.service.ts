import { Injectable } from '@angular/core';
import { AppConstants } from '@app-constants';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Language } from '@core/domain/enums/language.enum';
import { SelectOption } from '@core/domain/interfaces/select-options';

/**
 * Сервис языка приложения.
 */
@Injectable({ providedIn: 'root' })
export class LocaleService {

  // Поток активного языка
  static readonly language$ = new BehaviorSubject<string>(AppConstants.LANGUAGES.EN);

  constructor(
    private readonly translateService: TranslateService,
    private readonly localStorageService: LocalStorageService,
  ) {
    translateService.addLangs(Object.values(AppConstants.LANGUAGES));

    const savedLanguage = localStorageService.getItem(AppConstants.KEYS.LANGUAGE);

    if (savedLanguage) {
      translateService.setDefaultLang(savedLanguage);
      LocaleService.language$.next(savedLanguage?.toLowerCase());
    } else {
      const browserLanguage = translateService.getBrowserLang() ?? AppConstants.LANGUAGES.EN.toUpperCase();
      let selectedLanguage: string;

      if (browserLanguage in AppConstants.LANGUAGES) {
        selectedLanguage = browserLanguage;
      } else {
        selectedLanguage = AppConstants.LANGUAGES.EN.toUpperCase();
      }

      localStorageService.setItem(AppConstants.KEYS.LANGUAGE, browserLanguage);
      LocaleService.language$.next(browserLanguage?.toLowerCase());
    }

    translateService.onLangChange
      .subscribe((params) => {
        localStorageService.setItem(AppConstants.KEYS.LANGUAGE, params.lang);
        LocaleService.language$.next(params.lang?.toLowerCase());
      });
  }

  set language(value: string) {
    const language = value?.toUpperCase();
    this.translateService.use(language);
  }

  static get languages(): SelectOption[] {
    const languages: SelectOption[] = [];
    Language.LanguageDictionary.forEach((enumData, enumValue) => {
      languages.push({
        id: enumValue,
        name: enumData.name,
      });
    });
    return languages;
  }
}
