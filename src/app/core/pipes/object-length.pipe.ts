import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'appObjectLength'})
export class ObjectLengthPipe implements PipeTransform {
  transform(value: object): number {
    let keys = Object.keys(value);
    return keys.length;
  }
}
