import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'appOperatingSystem'})
export class OperatingSystemPipe implements PipeTransform {
  transform(value: string): string {
    let family = 'fas';
    let icon = 'fa-question';
    switch (value.toLowerCase()) {
      case 'windows':
        family = 'fab';
        icon = 'fa-windows';
        break;
      case 'apple':
        family = 'fab';
        icon = 'fa-apple';
        break;
      case 'linux':
        family = 'fab';
        icon = 'fa-linux';
        break;
      case 'android':
        family = 'fab';
        icon = 'fa-android';
        break;
    }

    return '<i class="' + family + ' fa-fw ' + icon + '" aria-hidden="true"></i>';
  }
}
