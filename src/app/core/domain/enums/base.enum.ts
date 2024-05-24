export interface BaseEnumData {
  name: string;
  altName?: string;
}

/**
 * Base for client enums.
 */
export abstract class BaseEnum {

  abstract id: any;
  abstract name: string;

  static toClientObject(_serverObject: any): BaseEnum {
    return null;
  }

  static toServerObject(baseEnum: any): any {
    if (!baseEnum) {
      return null;
    }
    if (baseEnum instanceof BaseEnum) {
      return baseEnum.id;
    }
    return baseEnum;
  }
}
