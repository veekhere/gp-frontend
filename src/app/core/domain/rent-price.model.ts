import { ObjectUtils } from '@core/utils/object-utils';
import { BaseDomain } from './base-domain.model';
import { RentPriceInput } from '@graphql';

export class RentPrice extends BaseDomain {

  min: number = null;

  max: number = null;

  constructor(entity: Partial<RentPrice> = null) {
    super();
    if (!entity) {
      return;
    }
    ObjectUtils.constructorFiller(this, entity);
  }

  static override toClientObject(entity: any): RentPrice {
    if (!entity) {
      return null;
    }
    return new RentPrice(entity);
  }

  override toServerObject(): RentPriceInput {
    return {
      min: this.min,
      max: this.max,
    };
  }
}
