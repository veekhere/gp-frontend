import { v4 as uuidv4 } from 'uuid';
import { ButtonSelectItem } from './button-select-item.model';
import { PartialSome } from '@core/core.types';
import { ObjectUtils } from '@core/utils/object-utils';

export class ButtonSelectGroup {

  id = uuidv4();
  name: string = null;
  items: ButtonSelectItem[] = null;

  constructor(group: PartialSome<ButtonSelectGroup, 'id'> = null) {
    if (!group) {
      return;
    }
    ObjectUtils.constructorFiller(this, group);
    this.items = group.items?.map((i) => ButtonSelectItem.toClientObject(i, group.id));
  }

  static toClientObject(group: any): ButtonSelectGroup {
    if (!group) {
      return null;
    }
    return new ButtonSelectGroup(group);
  }
}
