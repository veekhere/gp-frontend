import { PartialSome } from '@core/core.types';
import { ObjectUtils } from '@core/utils/object-utils';
import { Observable } from 'rxjs';

export class ButtonSelectItem {
  id: any = null;
  groupId: string = null;
  name: string = null;
  disabled = false;
  icon: string = null;
  hasNotification$: Observable<boolean> = null;

  constructor(item: PartialSome<ButtonSelectItem, 'groupId' | 'disabled' | 'icon' | 'hasNotification$'> = null) {
    if (!item) {
      return;
    }
    ObjectUtils.constructorFiller(this, item);
    this.hasNotification$ = item.hasNotification$;
  }

  static toClientObject(item: any, groupId?: string): ButtonSelectItem {
    if (!item) {
      return null;
    }
    return new ButtonSelectItem({ groupId, ...item });
  }
}
