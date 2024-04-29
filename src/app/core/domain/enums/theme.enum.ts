import { SelectOption } from '../interfaces/select-options';
import { BaseEnum, BaseEnumData } from './base.enum';

export enum ThemeEnum {
  Dark = 'dark',
  Light = 'light',
}

export class Theme extends BaseEnum {
  static ThemeDictionary = new Map<ThemeEnum, BaseEnumData>([
    [ThemeEnum.Dark, { name: 'ENUM.THEME.DARK' }],
    [ThemeEnum.Light, { name: 'ENUM.THEME.LIGHT' }],
  ]);

  id: ThemeEnum;
  name: string;

  constructor(themeEnum: ThemeEnum) {
    super();

    if (!themeEnum) {
      return;
    }

    this.id = themeEnum;
    this.name = Theme.ThemeDictionary.get(themeEnum).name;
  }

  static override toClientObject(serverObject: any): Theme {
    if (!serverObject || !Theme.ThemeDictionary.has(serverObject)) {
      return null;
    }
    return new Theme(serverObject);
  }

  static toSelectOptions(): SelectOption[] {
    const options: SelectOption[] = [];
    Theme.ThemeDictionary.forEach((enumData, enumValue) => {
      options.push({
        id: enumValue,
        name: enumData.name,
      });
    });
    return options;
  }
}