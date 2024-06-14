import { Injectable } from '@angular/core';
import { AppConstants } from '@app-constants';
import { RentType } from '@core/domain/enums/rent-type.enum';
import { SpaceType } from '@core/domain/enums/space-type.enum';
import { SelectOption } from '@core/domain/interfaces/select-options';
import { LocaleService } from '@core/services/locale.service';
import { untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EnumOptionsService {

  static rentTypeOptions(parentInstance: any): Observable<SelectOption[]> {
    return LocaleService.language$
      .pipe(
        map((language) => {
          const options: SelectOption[] = [];
          RentType.RentTypeDictionary.forEach((enumData, enumValue) => {
            options.push({
              id: enumValue,
              name: language === AppConstants.LANGUAGES.RU ? enumData?.name : enumData?.altName,
            });
          });
          return options;
        }),
        untilDestroyed(parentInstance)
      );
  }

  static spaceTypeOptions(parentInstance: any): Observable<SelectOption[]> {
    return LocaleService.language$
      .pipe(
        map((language) => {
          const options: SelectOption[] = [];
          SpaceType.SpaceTypeDictionary.forEach((enumData, enumValue) => {
            options.push({
              id: enumValue,
              name: language === AppConstants.LANGUAGES.RU ? enumData?.name : enumData?.altName,
            });
          });
          return options;
        }),
        untilDestroyed(parentInstance)
      );
  }
}
