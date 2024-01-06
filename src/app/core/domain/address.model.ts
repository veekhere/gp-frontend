import { ObjectUtils } from '@core/utils/object-utils';
import { BaseDomain } from './base-domain.model';

/**
 * Интерфейс JSON-объекта с адресом.
 */
export interface AddressJsonModel extends JSON {
  address: {
    country?: string;
    state?: string;
    city?: string;
    road?: string;
    house_number?: string;
    name?: string;
  };
}

export class Address extends BaseDomain {
  /**
   * Страна.
   */
  country: string = null;
  /**
   * Область.
   */
  state: string = null;
  /**
   * Город.
   */
  city: string = null;
  /**
   * Улица.
   */
  road: string = null;
  /**
   * Номер строения.
   */
  houseNumber: string = null;
  /**
   * Имя помещения.
   */
  name: string = null;

  constructor(address: Partial<Address> = null) {
    super();
    if (!address) {
      return;
    }
    ObjectUtils.constructorFiller(this, address);
  }

  static override toClientObject(addressLike: any): Address {
    if (!addressLike) {
      return null;
    }
    return new Address(addressLike);
  }

  static fromJson(jsonAddress: AddressJsonModel): Address {
    if (!jsonAddress) {
      return null;
    }
    return new Address({
      ...jsonAddress?.address,
      houseNumber: jsonAddress?.address?.house_number
    });
  }

  override toString(): string {
    const addressArray = [
      ...new Set([
        this.state,
        this.city,
        this.road,
        this.houseNumber,
        this.name
      ]?.filter((s) => !!s))
    ];
    return addressArray?.join(', ');
  }
}
