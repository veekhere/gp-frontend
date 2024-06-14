import { ObjectUtils } from '@core/utils/object-utils';
import { BaseDomain } from './base-domain.model';
import { CommonProjection } from './common/projection.model';
import { RentType } from './enums/rent-type.enum';
import { RatingInput } from '@graphql';
import { DateUtils } from '@core/utils/date-utils';
import { map, Observable } from 'rxjs';
import { EnumOptionsService } from '@app/services/enum-options.service';
import { UntilDestroy } from '@ngneat/until-destroy';

export class RatingControlNames {
  static readonly PRICE: keyof Rating = 'price';
  static readonly RENT_TYPE: keyof Rating = 'rentType';
  static readonly PROS: keyof Rating = 'pros';
  static readonly CONS: keyof Rating = 'cons';
  static readonly COMMENT: keyof Rating = 'comment';
  static readonly PLACE_RATING: keyof Rating = 'placeRating';
  static readonly LANDLORD_RATING: keyof Rating = 'landlordRating';
  static readonly NEIGHBOR_RATING: keyof Rating = 'neighborRating';

  static readonly AVG_RATING: keyof Rating = 'avgRating';
}

@UntilDestroy()
export class Rating extends BaseDomain {
  /**
   * Цена аренды.
   */
  price: number = null;
  /**
   * Тип аренды.
   */
  rentType: RentType = null;
  /**
   * Преимущества.
   */
  pros: string = null;
  /**
   * Недостатки.
   */
  cons: string = null;
  /**
   * Комментарий.
   */
  comment: string = null;
  /**
   * Оценка помещения.
   */
  placeRating: number = null;
  /**
   * Оценка арендодателя.
   */
  landlordRating: number = null;
  /**
   * Оценка соседей.
   */
  neighborRating: number = null;
  /**
   * Помещение.
   */
  place: CommonProjection = null;
  /**
   * Дата и время создания отзыва.
   */
  createdAt: Date = null;
  /**
   * UI. Средний общий рейтинг.
   */
  avgRating: string = null;

  get rentType$(): Observable<string> {
    return EnumOptionsService.rentTypeOptions(this)
      .pipe(
        map((options) =>
          options
            ?.filter((option) => option?.id === this.rentType?.id)
            ?.map((option) => option?.name)
            ?.join(', ')
        )
      );
  }

  constructor(entity: Partial<Rating> = null) {
    super();
    if (!entity) {
      return;
    }
    ObjectUtils.constructorFiller(this, entity);
    this.rentType = RentType.toClientObject(entity.rentType?.id ?? entity.rentType);
    this.place = CommonProjection.toClientObject(entity.place);
    this.createdAt = DateUtils.toDate(entity.createdAt);
    this.avgRating = this.getAvgRating();
  }

  private getAvgRating(): string {
    const values = [this.placeRating, this.landlordRating];
    if (!!this.neighborRating) {
      values.push(this.neighborRating);
    }

    const avg = values.reduce((prev, curr) => prev + curr, 0) / values.length;

    return avg.toPrecision(2);
  }

  static override toClientObject(entity: any): Rating {
    if (!entity) {
      return null;
    }
    return new Rating(entity);
  }

  override toServerObject(): RatingInput {
    return {
      id: this.id,
      placeId: this.place?.toServerObject(),
      price: this.price,
      rentType: RentType.toServerObject(this.rentType),
      pros: this.pros,
      cons: this.cons,
      comment: this.comment,
      placeRating: this.placeRating,
      landlordRating: this.landlordRating,
      neighborRating: this.neighborRating,
    };
  }
}