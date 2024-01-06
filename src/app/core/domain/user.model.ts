/**
 * User model.
 */
export class User {
  /**
   * User's UUID.
   */
  uid: string = null;
  /**
   * User's e-mail.
   */
  email: string = null;
  /**
   * Display name (alias, nickname).
   */
  displayName: string = null;
  /**
   * Avatar URL.
   */
  photoURL: string = null;
  /**
   * Is user's e-mail verified flag.
   */
  emailVerified: boolean = false;
  /**
   * User's expense data.
   */
  // expenseData: ExpenseData = null;

  constructor(entity: Partial<User> = null) {
    if (!entity) {
      return null;
    }
    this.uid = entity.uid;
    this.email = entity.email;
    this.displayName = entity.displayName;
    this.photoURL = entity.photoURL;
    this.emailVerified = entity.emailVerified;
    // this.expenseData = ExpenseData.toClientObject(entity.expenseData);
  }

  static toClientObject(entity: any): User {
    if (!entity) {
      return null;
    }
    return new User(entity);
  }

  toServerObject(): string {
    return JSON.stringify(this);
  }
}
