import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NotificationService } from './notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApolloError } from '@apollo/client/errors';

/**
 * Error handler service.
 */
@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {

  private readonly ERROR_IN_UNKNOWN_FORMAT = 'ERROR_IN_UNKNOWN_FORMAT';
  private readonly NOT_FOUND = 'NOT_FOUND';
  private readonly NOT_AUTHORIZED = 'NOT_AUTHORIZED';

  private readonly MESSAGES: ReadonlyMap<string, string> = new Map<string, string>([
    [this.NOT_FOUND, 'не найдены данные по запрашиваемому идентификатору'],
    [this.ERROR_IN_UNKNOWN_FORMAT, 'произошла неизвестная ошибка'],
    [this.NOT_AUTHORIZED, 'ошибка авторизации'],
    ['SERVICE_UNAVAILABLE', 'сервис недоступен'],
    ['INVALID_DATA_FORMAT', 'некорректный формат данных'],
    ['SERVER_ERROR', 'серверная ошибка'],
  ]);

  private static formatMessage(prefix: string, description?: string, id?: string): string {
    let message = prefix;
    if (description) {
      message += `: ${description}`;
    }
    if (id) {
      message += ` (id = '${id}')`;
    }
    return message;
  }

  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  handleError(error: Error): Observable<any> {
    console.log(error?.message);
    this.notificationService.error(error?.message);
    return of(null);
  }

  public handleErrorAndNull(error: HttpErrorResponse, prefix: string, id?: string): Observable<any> {
    const message = this.prepareMessage(error, prefix, id);
    console.error(message, error);
    this.notificationService.error(message);
    return of(null);
  }

  private prepareMessage(error: HttpErrorResponse, prefix: string, id?: string): string {
    if (!error) {
      return prefix;
    }

    if (error.error instanceof ErrorEvent) {
      return ErrorHandlerService.formatMessage(prefix, error.error.message, id);
    }

    if (error.status === 401) {
      return ErrorHandlerService.formatMessage(prefix, this.MESSAGES.get(this.NOT_AUTHORIZED), id);
    }

    if (error.status === 404) {
      return ErrorHandlerService.formatMessage(prefix, this.MESSAGES.get(this.NOT_FOUND), id);
    }

    if (error instanceof ApolloError && error.graphQLErrors[0] && error.graphQLErrors[0].extensions) {
      const graphQLError = error.graphQLErrors[0];
      return ErrorHandlerService.formatMessage(prefix, this.MESSAGES.get(graphQLError.extensions['code'] as any), id);
    }

    return ErrorHandlerService.formatMessage(prefix, this.MESSAGES.get(this.ERROR_IN_UNKNOWN_FORMAT), id);
  }
}
