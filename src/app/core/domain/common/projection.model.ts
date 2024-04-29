import { ObjectUtils } from '@core/utils/object-utils';
import { BaseDomain } from '../base-domain.model';

export class CommonProjection extends BaseDomain {

  constructor(projection: Partial<CommonProjection> = null) {
    super();
    if (!projection) {
      return;
    }
    ObjectUtils.constructorFiller(this, projection);
  }

  static override toClientObject(projection: any): CommonProjection {
    if (!projection) {
      return null;
    }
    return new CommonProjection(projection);
  }

  override toServerObject(): string {
    return this.id;
  }
}