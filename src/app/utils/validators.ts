import { AbstractControl, ValidationErrors } from '@angular/forms';
import { REGEX } from '../constants/regex';

export const nameValidator = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) return null;
  return REGEX.NAME.test(value) ? null : { invalidName: true };
};

export const zipValidator = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  if (!value) return null;
  return REGEX.ZIP.test(value) ? null : { invalidZip: true };
};

export function emailValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (!control.value) return null;

  const isValid =
    REGEX.EMAIL.test(control.value);

  return isValid ? null : { invalidEmail: true };
}


export function phoneValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (!control.value) return null;

  const isValid = REGEX.PHONE.test(control.value);
  return isValid ? null : { invalidPhone: true };
}