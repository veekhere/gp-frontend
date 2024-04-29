import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../error-handler.service';
import { NotificationService } from '../notification.service';
import { RatePlaceGQL, RatePlaceMutation, RatingInput, SearchRatingsGQL, SearchRatingsQuery } from '@graphql';
import { FETCH_POLICY_NO_CACHE } from '@app-constants';
import { catchError, map, Observable, tap } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import { Rating } from '@core/domain/rating.model';
import { BaseEntityService } from '@core/domain/abstract/base-entity-service';
import { OperationStatus, OperationStatusEnum } from '@core/domain/enums/operation-status.enum';

@Injectable({ providedIn: 'root' })
export class RatingService extends BaseEntityService<Rating> {

  constructor(
    private readonly errorHandler: ErrorHandlerService,
    private readonly notificationService: NotificationService,
    private readonly searchRatingsQGL: SearchRatingsGQL,
    private readonly ratePlaceGQL: RatePlaceGQL,
  ) {
    super();
  }

  search(): Observable<Rating[]> {
    return this.searchRatingsQGL
      .fetch(null, { fetchPolicy: FETCH_POLICY_NO_CACHE })
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при получении списка отзывов')),
        map((response: ApolloQueryResult<SearchRatingsQuery>) =>
          response?.data?.search?.map((rating) => Rating.toClientObject(rating))),
      );
  }

  ratePlace(rating: RatingInput) {
    return this.ratePlaceGQL
      .mutate({ rating })
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при оценке помещения')),
        map((response: ApolloQueryResult<RatePlaceMutation>) => OperationStatus.toClientObject(response.data.ratePlace?.status)),
        tap((status) => {
          if (status?.id === OperationStatusEnum.Ok) {
            this.notificationService.success('Отзыв сохранен');
          }
        })
      );
  }

  get(id: string): Observable<Rating> {
    throw new Error('Not implemented');
  }

  create(entity: any): Observable<OperationStatus> {
    throw new Error('Not implemented');
  }

  update(entity: any): Observable<OperationStatus> {
    throw new Error('Not implemented');
  }

  delete(entities: any[]): Observable<OperationStatus> {
    throw new Error('Not implemented');
  }
}
