import { v4 as uuidv4 } from 'uuid';

/**
 * Base class for common domain models.
 */
export class BaseDomain {

  id: string = null;

  constructor() {
    this.id = uuidv4();
  }

  /**
   * Transform server entity to client entity.
   */
  static toClientObject(entity: any): BaseDomain {
    return null;
  }

  /**
   * Prepare entity for transfer.
   */
  toServerObject(): string {
    return JSON.stringify(this);
  }
}
