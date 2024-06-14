import { EnumOptionsService } from '@app/services/enum-options.service';
import { ObjectUtils } from '@core/utils/object-utils';
import { UntilDestroy } from '@ngneat/until-destroy';
import { map, Observable } from 'rxjs';
import { BaseDomain } from './base-domain.model';
import { RentType } from './enums/rent-type.enum';
import { SpaceType } from './enums/space-type.enum';

export class PlaceProjectionControlNames {
  static readonly AVG_PLACE_RATING: keyof PlaceProjection = 'avgPlaceRating';
  static readonly AVG_LANDLORD_RATING: keyof PlaceProjection = 'avgLandlordRating';
  static readonly AVG_NEIGHBOR_RATING: keyof PlaceProjection = 'avgNeighborRating';
  static readonly AVG_RATING: keyof PlaceProjection = 'avgRating';
}

@UntilDestroy()
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
  /**
   * UI. Средний общий рейтинг.
   */
  avgRating: string = null;

  get address(): string {
    return `${this.country}, ${this.state ? this.state + ',' : ''} ${this.city}, ${this.road} ${this.houseNumber}`;
  }

  get spaceType$(): Observable<string> {
    return EnumOptionsService.spaceTypeOptions(this)
      .pipe(
        map((options) =>
          options
            ?.filter((option) => option?.id === this.spaceType?.id)
            ?.map((option) => option?.name)
            ?.join(', ')
        )
      );
  }

  get rentTypes$(): Observable<string> {
    return EnumOptionsService.rentTypeOptions(this)
      ?.pipe(
        map((options) =>
          options
            ?.filter((option) =>
              !!this.rentType?.find((value) => value?.id === option?.id)
            )
            ?.map((option) => option?.name)
            ?.join(', ')
        )
      );
  }

  constructor(entity: Partial<PlaceProjection> = null) {
    super();
    if (!entity) {
      return;
    }
    ObjectUtils.constructorFiller(this, entity);
    this.avgRating = this.getAvgRating();
    this.rentType = entity.rentType?.map((o) => RentType.toClientObject(o?.id ?? o)) ?? [];
    this.spaceType = SpaceType.toClientObject(entity.spaceType?.id ?? entity?.spaceType);
  }

  static override toClientObject(entity: any): PlaceProjection {
    if (!entity) {
      return null;
    }
    return new PlaceProjection(entity);
  }

  private getAvgRating(): string {
    const values = [this.avgPlaceRating, this.avgLandlordRating];
    if (!!this.avgNeighborRating) {
      values.push(this.avgNeighborRating);
    }

    const avg = values.reduce((prev, curr) => prev + curr, 0) / values.length;

    return avg.toPrecision(2);
  }
}
