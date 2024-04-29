import { BaseEnum } from './base.enum';

export enum OperationStatusEnum {
  Ok = 'OK',
  Error = 'FAILED',
}

interface OperationStatusData {
  name: string;
}

/**
 * Перечисление "Результат выполнения операции".
 */
export class OperationStatus extends BaseEnum {

  static OperationStatusDictionary = new Map<OperationStatusEnum, OperationStatusData>([
    [OperationStatusEnum.Ok, { name: '200' }],
    [OperationStatusEnum.Error, { name: '0' }],
  ]);

  /**
   * Значение перечисления.
   */
  id: OperationStatusEnum;
  /**
   * Наименование перечисления.
   */
  name: string;

  constructor(operationStatusEnum: OperationStatusEnum) {
    super();
    if (!operationStatusEnum) {
      return;
    }
    this.id = operationStatusEnum;
    this.name = OperationStatus.OperationStatusDictionary.get(operationStatusEnum).name;
  }

  static override toClientObject(serverObject: any): OperationStatus {
    if (!serverObject || !OperationStatus.OperationStatusDictionary.has(serverObject)) {
      return null;
    }
    return new OperationStatus(serverObject);
  }
}
