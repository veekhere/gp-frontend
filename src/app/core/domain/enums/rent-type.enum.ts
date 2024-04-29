import { BaseEnum, BaseEnumData } from './base.enum';
import { RentType as GeneratedRentType } from '@graphql';

export enum RentTypeEnum {
  ShortTerm = GeneratedRentType.ShortTerm,
  LongTerm = GeneratedRentType.LongTerm,
}

/**
 * Перечисление "RentType"
 */
export class RentType extends BaseEnum {
  public static RentTypeDictionary = new Map<RentTypeEnum, BaseEnumData>([
    [RentTypeEnum.ShortTerm, { name: 'ENUM.RENT_TYPE.SHORT_TERM' }],
    [RentTypeEnum.LongTerm, { name: 'ENUM.RENT_TYPE.LONG_TERM' }],
  ]);

  /**
   * Значение перечисления.
   */
  id: RentTypeEnum;
  /**
   * Наименование перечисления.
   */
  name: string;

  constructor(rentTypeEnum: RentTypeEnum) {
    super();

    if (!rentTypeEnum) {
      return;
    }

    this.id = rentTypeEnum;
    this.name = RentType.RentTypeDictionary.get(rentTypeEnum).name;
  }

  static override toClientObject(serverObject: any): RentType {
    if (!serverObject || !RentType.RentTypeDictionary.has(serverObject)) {
      return null;
    }
    return new RentType(serverObject);
  }
}
