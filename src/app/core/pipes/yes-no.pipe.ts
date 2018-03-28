import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'appYesNo'})
export class YesNoPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'Yes' : 'No';
  }
}
