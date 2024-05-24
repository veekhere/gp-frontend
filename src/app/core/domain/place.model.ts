import { ObjectUtils } from '@core/utils/object-utils';
import { PlaceInput } from '@graphql';
import { BaseDomain } from './base-domain.model';
import { RentType } from './enums/rent-type.enum';
import { SpaceType } from './enums/space-type.enum';
import { Location } from './location.model';
import { Rating } from './rating.model';
import { RentPrice } from './rent-price.model';

export class PlaceControlNames {
  static readonly AREA: keyof Place = 'area';
  static readonly FLOOR: keyof Place = 'floor';
  static readonly RENT_TYPE: keyof Place = 'rentType';
  static readonly SPACE_TYPE: keyof Place = 'spaceType';
  static readonly LOCATION: keyof Place = 'location';
}

export class Place extends BaseDomain {
  /**
   * Тип аренды.
   */
  rentType: RentType[] = null;
  /**
   * Тип помещения.
   */
  spaceType: SpaceType = null;
  /**
   * Площадь.
   */
  area: number = null;
  /**
   * Этаж.
   */
  floor: number = null;
  /**
   * Диапазон цен краткосрочной аренды.
   */
  shortTermPrices: RentPrice = null;
  /**
   * Диапазон цен долгосрочной аренды.
   */
  longTermPrices: RentPrice = null;
  /**
   * Широта.
   */
  latitude: number = null;
  /**
   * Долгота.
   */
  longitude: number = null;
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
   * Дом.
   */
  houseNumber: string = null;
  /**
   * Средняя оценка помещения.
   */
  avgPlaceRating: number = null;
  /**
   * Средняя оценка арендодателя.
   */
  avgLandlordRating: number = null;
  /**
   * Средняя оценка соседей.
   */
  avgNeighborRating: number = null;
  /**
   * Оценки.
   */
  ratings: Rating[] = null;
  /**
   * Локация. UI.
   */
  location: Location = null;

  get address(): string {
    return `${this.country}, ${this.state ? this.state + ',' : ''} ${this.city}, ${this.road} ${this.houseNumber}`;
  }

  get rentTypes(): string {
    return this.rentType?.map((o) => o?.name)?.join(', ');
  }

  get rating(): number {
    const values = [this.avgPlaceRating, this.avgLandlordRating];
    if (!!this.avgNeighborRating) {
      values.push(this.avgNeighborRating);
    }

    const avg = values.reduce((prev, curr) => prev + curr, 0) / values.length;

    return Number(avg.toPrecision(2));
  }

  constructor(entity: Partial<Place> = null) {
    super();
    if (!entity) {
      return;
    }
    ObjectUtils.constructorFiller(this, entity);
    this.rentType = entity.rentType?.map((o) => RentType.toClientObject(o?.id ?? o)) ?? [];
    this.spaceType = SpaceType.toClientObject(entity.spaceType?.id ?? entity?.spaceType);
    this.shortTermPrices = RentPrice.toClientObject(entity.shortTermPrices);
    this.longTermPrices = RentPrice.toClientObject(entity.longTermPrices);
    this.ratings = entity.ratings?.map((o) => Rating.toClientObject(o)) ?? [];
    this.location = Location.toClientObject(entity.location);

    this.syncLocations();
  }

  private syncLocations(): void {
    if (this.location && !this.country) {
      this.latitude = this.location.latitude;
      this.longitude = this.location.longitude;
      this.country = this.location.address?.country;
      this.state = this.location.address?.state;
      this.city = this.location.address?.city;
      this.road = this.location.address?.road;
      if (this.location.address?.houseNumber?.length) {
        this.houseNumber = this.location.address?.houseNumber;
      }
    }
    this.location = Location.toClientObject({
      latitude: this.latitude,
      longitude: this.longitude,
      address: {
        country: this.country,
        state: this.state,
        city: this.city,
        road: this.road,
        houseNumber: this.houseNumber,
      }
    });
  }

  static override toClientObject(entity: any): Place {
    if (!entity) {
      return null;
    }
    return new Place(entity);
  }

  override toServerObject(): PlaceInput {
    return {
      id: this.id,
      rentType: this.rentType?.map((o) => RentType.toServerObject(o)),
      spaceType: SpaceType.toServerObject(this.spaceType),
      area: this.area,
      floor: this.floor,
      latitude: this.latitude,
      longitude: this.longitude,
      country: this.country,
      state: this.state,
      city: this.city,
      road: this.road,
      houseNumber: this.houseNumber,
    };
  }
}
