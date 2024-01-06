import { ClassConstructor } from '@app/app.constants';

export function exhaustiveCheck(target: never, klass: ClassConstructor = null): never {
  const name = klass?.name + ':';
  throw new Error(`${name} Missing implementation for case: ${target}`.trim());
}
