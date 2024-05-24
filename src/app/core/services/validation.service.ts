import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Location } from '@core/domain/location.model';

const defaultMessages = {
  houseIsNotSelected: 'CONTROL.VALIDATION.HOUSE_IS_NOT_SELECTED',
  onlyDigits: 'CONTROL.VALIDATION.ONLY_DIGITS',
};

export const validators = {
  locationAutocomplete: (message?: string) => ((control: AbstractControl) => {
    const value: Location = control.value;
    if (!value || !value?.placeId) {
      return null;
    }
    if (value?.address?.houseNumber) {
      return null;
    }
    return error('houseIsNotSelected', message || defaultMessages.houseIsNotSelected);
  }),
  onlyDigits: () => ((control: AbstractControl) => {
    const value: string = control.value;
    if (!value) {
      return null;
    }
    const re = /^\d+$/;
    if (re.test(value)) {
      return null;
    }
    return error('onlyDigits', defaultMessages.onlyDigits);
  }),
};

function error(name: string, message: string): any {
  return { [name]: { message } };
}

@Injectable({ providedIn: 'root' })
export class ValidationService {
  validators = validators;
}
