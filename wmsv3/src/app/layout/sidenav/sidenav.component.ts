import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  menu: NavItem[] = [
    {
      displayName: 'Import',
      iconName: 'description',
      children: [
        {
          displayName: 'Shipment',
          iconName: 'how_to_reg',
          route: 'shipment',
        },
        {
          displayName: 'Todos',
          iconName: 'waves',
          route: '/todos',
        },
      ],
    },
    {
      displayName: 'Perfiles',
      iconName: 'group',
      children: [
        {
          displayName: 'Búsqueda Perfil',
          iconName: 'search',
          route: '/busquedaperfiles',
        },
      ],
    },
  ];

  panelOpenState = false;

  constructor(private breakpointObserver: BreakpointObserver) {}
}
