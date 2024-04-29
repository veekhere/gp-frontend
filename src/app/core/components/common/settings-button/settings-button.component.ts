import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonSelectGroup } from '@core/components/inputs/button-select/domain/button-select-group.model';
import { ButtonSelectItem } from '@core/components/inputs/button-select/domain/button-select-item.model';
import { Language, LanguageEnum } from '@core/domain/enums/language.enum';
import { Theme, ThemeEnum } from '@core/domain/enums/theme.enum';
import { LocaleService } from '@core/services/locale.service';
import { ThemeService } from '@core/services/theme.service';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-settings-button',
  templateUrl: './settings-button.component.html',
  styleUrls: ['./settings-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsButtonComponent {

  readonly language$ = LocaleService.language$.pipe(
    map((language) => Language.toClientObject(language as LanguageEnum)?.flagName)
  );

  readonly data$ = new BehaviorSubject<ButtonSelectGroup[]>([
    new ButtonSelectGroup({
      name: 'APPLICATION.LANGUAGE',
      items: [
        ...LocaleService.languages.map((languageOption) => new ButtonSelectItem(languageOption))
      ]
    }),
    new ButtonSelectGroup({
      name: 'APPLICATION.THEME',
      items: [
        ...Theme.toSelectOptions().map((themeOption) => new ButtonSelectItem(themeOption))
      ]
    }),
  ]);

  constructor(
    private readonly localeService: LocaleService,
    private readonly themeService: ThemeService,
  ) {}

  onSelect(item?: ButtonSelectItem): void {
    if (Object.values(LanguageEnum)?.includes(item?.id)) {
      this.localeService.setLanguage(item?.id);
    }

    if (Object.values(ThemeEnum)?.includes(item?.id)) {
      this.themeService.setTheme(item?.id);
    }
  }
}
