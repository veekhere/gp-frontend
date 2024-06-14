import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { FETCH_POLICY_NO_CACHE } from '@app-constants';
import { BaseEntityService } from '@core/domain/abstract/base-entity-service';
import { OperationStatus, OperationStatusEnum } from '@core/domain/enums/operation-status.enum';
import { PlaceProjection } from '@core/domain/place-projection.model';
import { Place } from '@core/domain/place.model';
import {
  CreatePlaceGQL,
  CreatePlaceMutation,
  DeletePlaceGQL,
  GetPlaceGQL,
  GetPlaceQuery,
  PlaceFilter,
  PlaceInput,
  SearchPlacesGQL,
  SearchPlacesQuery,
  UpdatePlaceGQL,
  UpdatePlaceMutation
} from '@graphql';
import { catchError, map, Observable, tap } from 'rxjs';
import { ErrorHandlerService } from '../error-handler.service';
import { NotificationService } from '../notification.service';

@Injectable({ providedIn: 'root' })
export class PlaceService extends BaseEntityService<Place> {

  constructor(
    private readonly errorHandler: ErrorHandlerService,
    private readonly notificationService: NotificationService,
    private readonly searchPlacesGQL: SearchPlacesGQL,
    private readonly getPlaceGQL: GetPlaceGQL,
    private readonly createPlaceGQL: CreatePlaceGQL,
    private readonly updatePlaceGQL: UpdatePlaceGQL,
    private readonly deletePlaceGQL: DeletePlaceGQL,
  ) {
    super();
  }

  search(filter: PlaceFilter): Observable<PlaceProjection[]> {
    return this.searchPlacesGQL
      .fetch({ filter: filter ?? {} }, { fetchPolicy: FETCH_POLICY_NO_CACHE })
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при получении списка помещений')),
        map((response: ApolloQueryResult<SearchPlacesQuery>) =>
          response?.data?.search?.map((place) => PlaceProjection.toClientObject(place))),
      );
  }

  get(id: string): Observable<Place> {
    return this.getPlaceGQL
      .fetch({ id }, { fetchPolicy: FETCH_POLICY_NO_CACHE })
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при получении помещения')),
        map((response: ApolloQueryResult<GetPlaceQuery>) => Place.toClientObject(response?.data?.get)),
      );
  }

  create(place: PlaceInput): Observable<OperationStatus> {
    return this.createPlaceGQL
      .mutate({ place }, { fetchPolicy: FETCH_POLICY_NO_CACHE })
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при создании помещения')),
        map((response: ApolloQueryResult<CreatePlaceMutation>) => OperationStatus.toClientObject(response.data.create?.status)),
        tap((status) => {
          if (status?.id === OperationStatusEnum.Success) {
            this.notificationService.success('Помещение создано');
          }
        })
      );
  }

  update(place: PlaceInput): Observable<OperationStatus> {
    return this.updatePlaceGQL
      .mutate({ place }, { fetchPolicy: FETCH_POLICY_NO_CACHE })
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при обновлении помещения')),
        map((response: ApolloQueryResult<UpdatePlaceMutation>) => OperationStatus.toClientObject(response.data.update?.status)),
        tap((status) => {
          if (status?.id === OperationStatusEnum.Success) {
            this.notificationService.success('Помещение обновлено');
          }
        })
      );
  }

  delete(place: Place): Observable<OperationStatus> {
    return this.deletePlaceGQL
      .mutate({ id: place?.id }, { fetchPolicy: FETCH_POLICY_NO_CACHE })
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при удалении помещения')),
        map((response: ApolloQueryResult<UpdatePlaceMutation>) => OperationStatus.toClientObject(response.data.update?.status)),
        tap((status) => {
          if (status?.id === OperationStatusEnum.Success) {
            this.notificationService.success('Помещение удалено');
          }
        })
      );
  }
}
