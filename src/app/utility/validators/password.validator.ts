import { AbstractControl } from '@angular/forms';

export class PasswordValidator {
  static matchPassword(abstractControl: AbstractControl) {
    let password = abstractControl.get('password').value;
    let confirmPassword = abstractControl.get('confirmPassword').value;
    let field = abstractControl.get('confirmPassword');

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
