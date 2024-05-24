import { Injectable } from '@angular/core';
import { Place } from '@core/domain/place.model';
import { EntityStoreService } from '../entity-store.service';

@Injectable({ providedIn: 'root' })
export class PlaceStoreService extends EntityStoreService<Place> {}
