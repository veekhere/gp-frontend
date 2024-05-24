import { BaseEnum, BaseEnumData } from './base.enum';
import { SpaceType as GeneratedSpaceType } from '@graphql';

export enum SpaceTypeEnum {
  Apartments = GeneratedSpaceType.Apartments,
  Flat = GeneratedSpaceType.Flat,
  Garage = GeneratedSpaceType.Garage,
  House = GeneratedSpaceType.House,
  OpenSpace = GeneratedSpaceType.OpenSpace,
  Utility = GeneratedSpaceType.Utility,
}

/**
 * Перечисление "SpaceType"
 */
export class SpaceType extends BaseEnum {
  public static SpaceTypeDictionary = new Map<SpaceTypeEnum, BaseEnumData>([
    [SpaceTypeEnum.Apartments, {
      name: 'Апартаменты',
      altName: 'Apartments',
    }],
    [SpaceTypeEnum.Flat, {
      name: 'Квартира',
      altName: 'Flat',
    }],
    [SpaceTypeEnum.Garage, {
      name: 'Гараж/парковочное место',
      altName: 'Garage/parking slot',
    }],
    [SpaceTypeEnum.House, {
      name: 'Дом',
      altName: 'House',
    }],
    [SpaceTypeEnum.OpenSpace, {
      name: 'Помещение свободного назначения',
      altName: 'Open space',
    }],
    [SpaceTypeEnum.Utility, {
      name: 'Хозяйственного (специального) назначения',
      altName: 'Utility',
    }],
  ]);

  /**
   * Значение перечисления.
   */
  id: SpaceTypeEnum;
  /**
   * Наименование перечисления.
   */
  name: string;

  constructor(spaceTypeEnum: SpaceTypeEnum) {
    super();

    if (!spaceTypeEnum) {
      return;
    }

    this.id = spaceTypeEnum;
    this.name = SpaceType.SpaceTypeDictionary.get(spaceTypeEnum).name;
  }

  static override toClientObject(serverObject: any): SpaceType {
    if (!serverObject || !SpaceType.SpaceTypeDictionary.has(serverObject)) {
      return null;
    }
    return new SpaceType(serverObject);
  }
}
