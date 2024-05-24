import { Injectable } from '@angular/core';
import { Rating } from '@core/domain/rating.model';
import { EntityStoreService } from '../entity-store.service';

@Injectable({ providedIn: 'root' })
export class RatingStoreService extends EntityStoreService<Rating> {}
