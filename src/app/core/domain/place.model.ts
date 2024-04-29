import { ObjectUtils } from '@core/utils/object-utils';
import { PlaceInput } from '@graphql';
import { BaseDomain } from './base-domain.model';
import { RentType } from './enums/rent-type.enum';
import { SpaceType } from './enums/space-type.enum';
import { Rating } from './rating.model';
import { RentPrice } from './rent-price.model';

export class PlaceControlNames {
  static readonly RENT_TYPE: keyof Place = 'rentType';
  static readonly SPACE_TYPE: keyof Place = 'spaceType';
  static readonly AREA: keyof Place = 'area';
  static readonly FLOOR: keyof Place = 'floor';
  static readonly LATITUDE: keyof Place = 'latitude';
  static readonly LONGITUDE: keyof Place = 'longitude';
  static readonly COUNTRY: keyof Place = 'country';
  static readonly STATE: keyof Place = 'state';
  static readonly CITY: keyof Place = 'city';
  static readonly ROAD: keyof Place = 'road';
  static readonly HOUSE_NUMBER: keyof Place = 'houseNumber';
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
  houseNumber: number = null;
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
