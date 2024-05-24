import { BaseEnum } from './base.enum';
import { OperationStatus as GeneratedOperationStatus } from '@graphql';

export enum OperationStatusEnum {
  Success = GeneratedOperationStatus.Success,
  Failed = GeneratedOperationStatus.Failed,
}

interface OperationStatusData {
  name: string;
}

/**
 * Перечисление "Результат выполнения операции".
 */
export class OperationStatus extends BaseEnum {

  static OperationStatusDictionary = new Map<OperationStatusEnum, OperationStatusData>([
    [OperationStatusEnum.Success, { name: 'Success' }],
    [OperationStatusEnum.Failed, { name: 'Failed' }],
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
