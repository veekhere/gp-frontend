import { Observable } from 'rxjs';
import { BaseDomain } from '../base-domain.model';
import { OperationStatus } from '../enums/operation-status.enum';

export abstract class BaseEntityService<T extends BaseDomain> {
  abstract search(filter?: any): Observable<any[]>;
  abstract get(id: string): Observable<T>;
  abstract create(entity: any): Observable<OperationStatus>;
  abstract update(entity: any): Observable<OperationStatus>;
  abstract delete(entity: any): Observable<OperationStatus>;
}