import { BaseEnum, BaseEnumData } from './base.enum';

export enum LanguageEnum {
  En = 'en',
  Ru = 'ru',
}

export interface LanguageEnumData extends BaseEnumData {
  flagName: string;
}

export class Language extends BaseEnum {
  static LanguageDictionary = new Map<LanguageEnum, LanguageEnumData>([
    [LanguageEnum.En, { name: 'LANGUAGE.EN', flagName: 'us' }],
    [LanguageEnum.Ru, { name: 'LANGUAGE.RU', flagName: 'ru' }],
  ]);

  id: LanguageEnum;
  name: string;
  flagName: string;

  constructor(userActionEnum: LanguageEnum) {
    super();

    if (!userActionEnum) {
      return;
    }

    this.id = userActionEnum;
    this.name = Language.LanguageDictionary.get(userActionEnum).name;
    this.flagName = Language.LanguageDictionary.get(userActionEnum).flagName;
  }

  static override toClientObject(serverObject: any): Language {
    if (!serverObject || !Language.LanguageDictionary.has(serverObject)) {
      return null;
    }
    return new Language(serverObject);
  }
}