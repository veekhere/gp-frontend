import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Location } from '@core/domain/location.model';

const defaultMessages = {
  houseIsNotSelected: 'Selected address should have a house number', // TODO translate
};

export const validators = {
  locationAutocomplete: (message?: string) => ((control: AbstractControl) => {
    const value: Location = control.value;
    if (value?.address?.houseNumber) {
      return null;
    }
    return error('houseIsNotSelected', message || defaultMessages.houseIsNotSelected);
  }),
};

function error(name: string, message: string): any {
  return { [name]: { message } };
}

@Injectable({ providedIn: 'root' })
export class ValidationService {
  validators = validators;
}
