import { ClassConstructor } from '@app/app.constants';

export function exhaustiveCheck(target: never, className: string = null): never {
  const name = className ? className + ': ' : '';
  throw new Error(`${name}Missing implementation for case: ${target}`.trim());
}
