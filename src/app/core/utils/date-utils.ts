/**
 * Common Date utils.
 */
export class DateUtils {

  /**
   * Get 'yyyy-MM-ddTHH:mm:ssZ' string (current time zone).
   */
  public static formatToDateTime(value: Date): string {
    if (!value) {
      return null;
    }

    if (!DateUtils.isDate(value)) {
      value = DateUtils.toDate(value);
    }

    return value.toISOString();
  }

  /**
   * Get 'yyyy-MM-dd' string (current tome zone).
   */
  public static formatToDateOnly(value: Date): string {
    if (!DateUtils.isDate(value)) {
      value = DateUtils.toDate(value);
    }
    const fullYearString: string = value.getFullYear().toString();
    const month = value.getMonth() + 1;
    const monthString = month >= 10 ? month : `0${month}`;
    const date = value.getDate();
    const dateString = date >= 10 ? date : `0${date}`;
    return `${fullYearString}-${monthString}-${dateString}`;
  }

  /**
   * Transform date to 'ru-RU' (dd.MM.yyyy).
   */
  public static formatToRussianDateOnly(value: Date): string {
    if (!DateUtils.isDate(value)) {
      return null;
    }
    return value.toLocaleDateString('ru-RU');
  }

  /**
   * Transform time to 'ru-RU' (HH:mm:ss).
   */
  public static formatToRussianTimeOnly(value: Date): string {
    if (!DateUtils.isDate(value)) {
      return null;
    }
    return value.toLocaleTimeString('ru-RU');
  }

  /**
   * Transform date & time to dd.MM.yyyy HH:mm:ss.
   */
  public static formatToRussianDateTime(value: Date): string {
    if (!DateUtils.isDate(value)) {
      return null;
    }
    return `${this.formatToRussianDateOnly(value)} ${this.formatToRussianTimeOnly(value)}`;
  }

  /**
   * Check if value is Date.
   */
  public static isDate(value: any): value is Date {
    return value instanceof Date && !isNaN(value.valueOf());
  }

  /**
   * True transform to Date.
   */
  static toDate(value: Date | string): Date {
    if (DateUtils.isDate(value)) {
      return value;
    }
    if (typeof value === 'string') {
      const newDate = new Date(value);
      if (DateUtils.isDate(newDate)) {
        return newDate;
      }
    }
    return null;
  }

  /**
   * Get difference between two dates in days.
   */
  static getDifferenceInDays(currentDate: Date, previousDate: Date, useAbs = true): number {
    const currentDateTime = DateUtils.toDate(DateUtils.formatToDateOnly(currentDate)).getTime();
    const previousDateTime = DateUtils.toDate(DateUtils.formatToDateOnly(previousDate)).getTime();
    const result = Math.round((currentDateTime - previousDateTime) / (1000 * 60 * 60 * 24));

    return useAbs ? Math.abs(result) : result;
  }
}
