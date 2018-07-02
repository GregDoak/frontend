import {AbstractControl} from '@angular/forms';

export class PasswordValidator {
  static matchPassword(abstractControl: AbstractControl) {
    const password = abstractControl.get('password').value;
    const confirmPassword = abstractControl.get('confirmPassword').value;
    const field = abstractControl.get('confirmPassword');

    if (password !== confirmPassword) {
      if (field.errors === null) {
        field.setErrors({'matchPassword': true});
      } else {
        field.errors.matchPassword = true;
      }
    } else {
      if (field.errors !== null) {
        field.errors.matchPassword = false;
      }
    }
  }
}
