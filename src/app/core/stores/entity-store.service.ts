import { BaseDomain } from '@core/domain/base-domain.model';
import { BehaviorSubject } from 'rxjs';

export class EntityStoreService<T extends BaseDomain> {

  private readonly innerLoadedEntity = new BehaviorSubject<T>(null);
  private readonly innerEntity = new BehaviorSubject<T>(null);
  private readonly innerSavedEntity = new BehaviorSubject<T>(null);

  /**
   * Загруженный с сервера объект.
   */
  set loadedEntity(entity: T) {
    this.innerLoadedEntity.next(entity);
  }
  get loadedEntity(): T {
    return this.innerLoadedEntity.value;
  }

  /**
   * Объект, с которым работает UI.
   */
  set entity(entity: T) {
    this.innerEntity.next(entity);
  }
  get entity(): T {
    return this.innerEntity.value;
  }

  /**
   * Сохраненный объект.
   */
  set savedEntity(entity: T) {
    this.innerSavedEntity.next(entity);
  }
  get savedEntity(): T {
    return this.innerSavedEntity.value;
  }
}
