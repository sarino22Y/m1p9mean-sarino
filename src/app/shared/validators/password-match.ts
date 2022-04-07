
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchingPasswordsValidator (group: AbstractControl) {
    if (group.get('password')!.value !== group.get('confirmPassword')!.value) {
      return {'differentPasswords': true};
    } else {
      return null;
    }
  };
