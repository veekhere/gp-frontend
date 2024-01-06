import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonSelectGroup } from '@core/components/inputs/button-select/domain/button-select-group.model';
import { ButtonSelectItem } from '@core/components/inputs/button-select/domain/button-select-item.model';
import { Language, LanguageEnum } from '@core/domain/enums/language.enum';
import { LocaleService } from '@core/services/locale.service';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-locale-select-button',
  templateUrl: './locale-select-button.component.html',
  styleUrls: ['./locale-select-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocaleSelectButtonComponent {

  readonly language$ = LocaleService.language$.pipe(
    map((language) => Language.toClientObject(language as LanguageEnum)?.flagName)
  );

  readonly data$ = new BehaviorSubject<ButtonSelectGroup[]>([
    new ButtonSelectGroup({
      name: 'APPLICATION_LANGUAGE',
      items: [
        ...LocaleService.languages.map((languageOption) => new ButtonSelectItem(languageOption))
      ]
    }),
  ]);

  constructor(
    private readonly localeService: LocaleService,
  ) {}

  onSelect(item?: ButtonSelectItem): void {
    this.localeService.language = item?.id;
  }
}
