import {Component} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import 'rxjs/add/operator/filter';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent {
  public breadcrumbs: Array<Object>;

  constructor(private router: Router,
              private route: ActivatedRoute) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.breadcrumbs = [
        {
          label: {
            title: 'Home'
          },
          url: '/'
        }
      ];
      let currentRoute = this.route.root;
      let url = '';
      do {
        const childrenRoutes = currentRoute.children;
        currentRoute = null;
        childrenRoutes.forEach(childrenRoute => {
          if (childrenRoute.outlet === 'primary') {
            const routeSnapshot = childrenRoute.snapshot;
            url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');

            const breadcrumb = {
              label: childrenRoute.snapshot.data,
              url: url
            };

            const results = this.breadcrumbs.map(value => {
              return breadcrumb.label.title === value['label'].title && breadcrumb.url === value['url'];
            });

            if (results.indexOf(true) === -1) {
              this.breadcrumbs.push(breadcrumb);
            }
            currentRoute = childrenRoute;
          }
        });
      } while (currentRoute);
    });
  }
}
