import { Pipe, PipeTransform } from '@angular/core';
import { CommonUtils } from '@core/utils/common-utils';
import { DateUtils } from '@core/utils/date-utils';

@Pipe({ name: 'formatDate' })
export class FormatDatePipe implements PipeTransform {

  transform(value: string | Date, format: 'full' | 'only-date' | 'only-time' = 'full', trimSeconds = false): string {
    if (!value) {
      return null;
    }
    const date = DateUtils.toDate(value);

    switch (format) {
      case 'full':
        return date ? DateUtils.formatToRussianDateTime(date) : null;

      case 'only-date':
        return date ? DateUtils.formatToRussianDateOnly(date) : null;

      case 'only-time':
        return date ? DateUtils.formatToRussianTimeOnly(date, trimSeconds) : null;

      default:
        CommonUtils.exhaustiveCheck(format, 'FormatDatePipe');
    }
  }
}
