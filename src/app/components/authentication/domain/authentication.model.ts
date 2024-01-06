import { ObjectUtils } from '@core/utils/object-utils';

export type FirebaseEmailPassword = {
  email: string;
  password: string;
};

export class AuthenticationControlNames {
  static readonly EMAIL: keyof AuthenticationModel = 'email';
  static readonly PASSWORD: keyof AuthenticationModel = 'password';
}

export class AuthenticationModel {

  email: string = null;
  password: string = null;

  constructor(model: Partial<AuthenticationModel> = null) {
    if (!model) {
      return;
    }
    ObjectUtils.constructorFiller(this, model);
  }

  toServerObject(): FirebaseEmailPassword {
    return {
      email: this.email,
      password: this.password,
    };
  };
}
