import { BaseEnum, BaseEnumData } from './base.enum';

export enum UserActionEnum {
  Settings = 'settings',
  Logout = 'logout',
  Login = 'login',
  SignUp = 'sign-up',
}

export class UserAction extends BaseEnum {
  public static UserActionDictionary = new Map<UserActionEnum, BaseEnumData>([
    [UserActionEnum.Settings, { name: 'NAVIGATION.USER.ACTIONS.SETTINGS' }],
    [UserActionEnum.Logout, { name: 'NAVIGATION.USER.ACTIONS.LOGOUT' }],
    [UserActionEnum.Login, { name: 'NAVIGATION.USER.ACTIONS.LOGIN' }],
    [UserActionEnum.SignUp, { name: 'NAVIGATION.USER.ACTIONS.SIGN_UP' }],
  ]);

  id: UserActionEnum;
  name: string;

  constructor(userActionEnum: UserActionEnum) {
    super();

    if (!userActionEnum) {
      return;
    }

    this.id = userActionEnum;
    this.name = UserAction.UserActionDictionary.get(userActionEnum).name;
  }

  static override toClientObject(serverObject: any): UserAction {
    if (!serverObject || !UserAction.UserActionDictionary.has(serverObject)) {
      return null;
    }
    return new UserAction(serverObject);
  }
}
