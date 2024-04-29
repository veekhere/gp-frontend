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
    [SpaceTypeEnum.Apartments, { name: 'ENUM.SPACE_TYPE.APARTMENTS' }],
    [SpaceTypeEnum.Flat, { name: 'ENUM.SPACE_TYPE.FLAT' }],
    [SpaceTypeEnum.Garage, { name: 'ENUM.SPACE_TYPE.GARAGE' }],
    [SpaceTypeEnum.House, { name: 'ENUM.SPACE_TYPE.HOUSE' }],
    [SpaceTypeEnum.OpenSpace, { name: 'ENUM.SPACE_TYPE.OPEN_SPACE' }],
    [SpaceTypeEnum.Utility, { name: 'ENUM.SPACE_TYPE.UTILITY' }],
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
