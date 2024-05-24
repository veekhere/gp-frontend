import { ObjectUtils } from '@core/utils/object-utils';
import { BaseDomain } from './base-domain.model';
import { Address, AddressJsonModel } from './address.model';

/**
 * Тип JSON-объекта локации.
 */
export type LocationJsonModel = LocationJsonModelPrefab & AddressJsonModel;

interface LocationJsonModelPrefab extends JSON {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
};

export class Location extends BaseDomain {
  /**
   * ID точки.
   */
  placeId: number = null;
  /**
   * Широта.
   */
  latitude: number = null;
  /**
   * Долгота.
   */
  longitude: number = null;
  /**
   * Адрес.
   */
  address: Address = null;

  constructor(location: Partial<Location> = null) {
    super();
    if (!location || !location?.latitude) {
      return;
    }
    ObjectUtils.constructorFiller(this, location);
    this.address = Address.toClientObject(location?.address);
  }

  static override toClientObject(address: any): Location {
    if (!address || !address?.latitude) {
      return null;
    }
    return new Location(address);
  }

  static fromJson(jsonLocation: LocationJsonModel): Location {
    if (!jsonLocation) {
      return null;
    }
    return new Location({
      placeId: jsonLocation?.place_id,
      latitude: Number(jsonLocation?.lat),
      longitude: Number(jsonLocation?.lon),
      address: Address.fromJson(jsonLocation),
    });
  }

  override toString(): string {
    return this.address?.toString();
  }
}
