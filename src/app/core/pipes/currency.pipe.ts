import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appCurrency' })
export class CurrencyPipe implements PipeTransform {

  transform(value: string | number, currency: 'RUB' | 'USD' = 'RUB', minimumFractionDigits = 2, maximumFractionDigits = 2): string {
    if (!value) {
      return null;
    }

    const val = Number(value);
    const formatter = new Intl.NumberFormat(currency === 'RUB' ? 'ru-RU' : 'en-US', { style: 'currency', currency, minimumFractionDigits, maximumFractionDigits });

    return formatter.format(val);
  }
}
