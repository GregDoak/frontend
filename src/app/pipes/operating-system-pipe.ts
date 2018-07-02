import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({name: 'appOperatingSystem'})
export class OperatingSystemPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: string): SafeHtml {
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

    return this.sanitizer.bypassSecurityTrustHtml('<i class="' + family + ' fa-fw ' + icon + '" aria-hidden="true"></i>');
  }
}
