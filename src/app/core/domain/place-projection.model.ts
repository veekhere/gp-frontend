import { ObjectUtils } from '@core/utils/object-utils';
import { BaseDomain } from './base-domain.model';
import { RentType } from './enums/rent-type.enum';
import { SpaceType } from './enums/space-type.enum';

export class PlaceProjection extends BaseDomain {
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
   * Средняя стоимость аренды.
   */
  avgPrice: number = null;
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

  constructor(entity: Partial<PlaceProjection> = null) {
    super();
    if (!entity) {
      return;
    }
    ObjectUtils.constructorFiller(this, entity);
    this.rentType = entity.rentType?.map((o) => RentType.toClientObject(o?.id ?? o)) ?? [];
    this.spaceType = SpaceType.toClientObject(entity.spaceType?.id ?? entity?.spaceType);
  }

  static override toClientObject(entity: any): PlaceProjection {
    if (!entity) {
      return null;
    }
    return new PlaceProjection(entity);
  }
}
