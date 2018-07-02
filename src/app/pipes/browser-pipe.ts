import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({name: 'appBrowser'})
export class BrowserPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: string): SafeHtml {
    let family = 'fas';
    let icon = 'fa-question';
    switch (value.toLowerCase()) {
      case 'chrome':
        family = 'fab';
        icon = 'fa-chrome';
        break;
      case 'firefox':
        family = 'fab';
        icon = 'fa-firefox';
        break;
      case 'edge':
        family = 'fab';
        icon = 'fa-edge';
        break;
      case 'ie':
        family = 'fab';
        icon = 'fa-internet-explorer';
        break;
      case 'opera':
        family = 'fab';
        icon = 'fa-opera';
        break;
      case 'safari':
        family = 'fab';
        icon = 'fa-safari';
        break;
    }

    return this.sanitizer.bypassSecurityTrustHtml('<i class="' + family + ' fa-fw ' + icon + '" aria-hidden="true"></i>');
  }
}
