import { ObjectUtils } from '@core/utils/object-utils';
import { RentType } from '../enums/rent-type.enum';
import { SpaceType } from '../enums/space-type.enum';
import { PlaceFilter as GeneratedPlaceFilter } from '@graphql';

export class PlaceFilterControlNames {
  static readonly RENT_TYPE: keyof PlaceFilter = 'rentType';
  static readonly SPACE_TYPE: keyof PlaceFilter = 'spaceType';
  static readonly AREA_FROM: keyof PlaceFilter = 'areaFrom';
  static readonly AREA_TO: keyof PlaceFilter = 'areaTo';
  static readonly FLOOR: keyof PlaceFilter = 'floor';
  static readonly PRICE_FROM: keyof PlaceFilter = 'priceFrom';
  static readonly PRICE_TO: keyof PlaceFilter = 'priceTo';
  static readonly COUNTRY: keyof PlaceFilter = 'country';
  static readonly STATE: keyof PlaceFilter = 'state';
  static readonly CITY: keyof PlaceFilter = 'city';
  static readonly ROAD: keyof PlaceFilter = 'road';
  static readonly HOUSE_NUMBER: keyof PlaceFilter = 'houseNumber';
  static readonly PLACE_RATING_FROM: keyof PlaceFilter = 'placeRatingFrom';
  static readonly PLACE_RATING_TO: keyof PlaceFilter = 'placeRatingTo';
  static readonly LANDLORD_RATING_FROM: keyof PlaceFilter = 'landlordRatingFrom';
  static readonly LANDLORD_RATING_TO: keyof PlaceFilter = 'landlordRatingTo';
  static readonly NEIGHBOR_RATING_FROM: keyof PlaceFilter = 'neighborRatingFrom';
  static readonly NEIGHBOR_RATING_TO: keyof PlaceFilter = 'neighborRatingTo';
}

export class PlaceFilter {
  rentType: RentType = null;
  spaceType: SpaceType = null;
  areaFrom: number = null;
  areaTo: number = null;
  floor: number = null;
  priceFrom: number = null;
  priceTo: number = null;
  country: string = null;
  state: string = null;
  city: string = null;
  road: string = null;
  houseNumber: string = null;
  placeRatingFrom: number = null;
  placeRatingTo: number = null;
  landlordRatingFrom: number = null;
  landlordRatingTo: number = null;
  neighborRatingFrom: number = null;
  neighborRatingTo: number = null;

  constructor(filter: Partial<PlaceFilter> = null) {
    if (!filter) {
      return;
    }
    ObjectUtils.constructorFiller(this, filter);
    this.rentType = RentType.toClientObject(filter.rentType?.id ?? filter?.rentType);
    this.spaceType = SpaceType.toClientObject(filter.spaceType?.id ?? filter?.spaceType);
    this.houseNumber = filter.houseNumber?.toString();
  }

  toServerObject(): GeneratedPlaceFilter {
    return {
      areaFrom: this.areaFrom,
      areaTo: this.areaTo,
      city: this.city,
      country: this.country,
      floor: this.floor,
      houseNumber: this.houseNumber,
      landlordRatingFrom: this.landlordRatingFrom,
      landlordRatingTo: this.landlordRatingTo,
      neighborRatingFrom: this.neighborRatingFrom,
      neighborRatingTo: this.neighborRatingTo,
      placeRatingFrom: this.placeRatingFrom,
      placeRatingTo: this.placeRatingTo,
      priceFrom: this.priceFrom,
      priceTo: this.priceTo,
      rentType: RentType.toServerObject(this.rentType),
      road: this.road,
      spaceType: SpaceType.toServerObject(this.spaceType),
      state: this.state,
    };
  }
}
