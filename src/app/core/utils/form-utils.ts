import { FormArray, FormControl, FormGroup } from '@angular/forms';

/**
 * Common form utils.
 */
export class FormUtils {
  /**
   * Add control in form.
   */
  static addControls(formGroup: FormGroup, controls: { [p: string]: FormControl | FormGroup | FormArray }): void {
    Object.entries(controls).forEach(([key, value]) => {
      formGroup.addControl(key, value);
    });
  }

  /**
   * Get control form formGroup.
   */
  static getControl(formGroup: FormGroup, controlName: string): FormControl {
    const formControl = formGroup?.controls[controlName] as FormControl;
    return formControl ? formControl : null;
  }

  /**
   * Grt formGroup form formGroup.
   */
  static getFormGroup(groupName: string, formGroup: FormGroup): FormGroup {
    const innerFormGroup = formGroup?.controls[groupName] as FormGroup;
    return innerFormGroup ? innerFormGroup : null;
  }

  /**
   * Get formArray form formGroup.
   */
  static getFormArray(arrayName: string, formGroup: FormGroup): FormArray {
    const formArray = formGroup?.controls[arrayName] as FormArray;
    return formArray ? formArray : null;
  }

  /**
   * Get control from formGroup with full-list search.
   */
  static getDeepControl(formGroup: FormGroup, controlName: string): FormControl {
    let result = FormUtils.getControl(formGroup, controlName);
    if (result) {
      return result;
    }
    for (const name in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(name)) {
        const control = formGroup.controls[name];
        if (control instanceof FormGroup) {
          result = this.getDeepControl(control, controlName);
          if (result) {
            return result;
          }
        }
      }
    }
    return null;
  }

  /**
   * FormGroup value to object.
   */
  static mapFormToObject<T>(formGroup: FormGroup, objectClass: new (obj?: T) => T, previous: T = null, ignoreHighLevelFormGroup = true): T {
    const newObject = new objectClass();

    const formValue = this.mapFormGroupToFormValue(formGroup, ignoreHighLevelFormGroup);
    Object.entries(formValue)
      .filter(([key, _]) => newObject.hasOwnProperty(key))
      .forEach(([key, _value]) => {
        const value: any = _value;
        (newObject as any)[key] = value;
      });

    if (previous) {
      Object.entries(previous)
        .filter(([key, _]) => {
          const control = this.getDeepControl(formGroup, key);
          return !control || control.invalid;
        })
        .forEach(([key, value]) => {
          (newObject as any)[key] = value;
        });
    }
    return newObject;
  }

  /**
   * Control value to object.
   */
  private static mapFormGroupToFormValue(formGroup: FormGroup, ignoreFormGroup = false): any {
    const formValue: any = {};
    Object.entries(formGroup.controls)
      .forEach(([key, control]) => {
        if (control instanceof FormControl && !control.invalid) {
          formValue[key] = FormUtils.prepareValue(control.value);
        }
        if (control instanceof FormGroup) {
          const formGroupValue = this.mapFormGroupToFormValue(control);
          if (ignoreFormGroup) {
            Object.entries(formGroupValue)
              .forEach(([innerKey, value]) => formValue[innerKey] = value);
          } else {
            formValue[key] = formGroupValue;
          }
        }
      });
    return formValue;
  }

  private static prepareValue(value: any): any {
    if (typeof value === 'string') {
      return value.trim();
    }
    return value;
  }
}
