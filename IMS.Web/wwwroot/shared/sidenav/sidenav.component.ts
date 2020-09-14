import { Component, Input, Renderer2, OnInit } from '@angular/core';
import { Sidenav } from './sidenav.model';
import { SidenavService } from './sidenav.service';
import { LoaderService } from '../loader-service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html'
})
export class SidenavComponent implements OnInit {
  userInfo: any = {};
  constructor(private renderer: Renderer2, private sidenavService: SidenavService, private loaderService: LoaderService) { }

  @Input() nav: Sidenav[] = [];

  toggleSubMenu(event: Event) {
    let target = (<HTMLElement>(<HTMLElement>event.target).parentNode);
    const action = target.classList.contains('open') ? 'removeClass' : 'addClass';
    this.renderer[action](target, 'open');
  }

  ngOnInit() {
    //this.loaderService.toggleLoader(true);
    //this.sidenavService.getLoggedInUserDetail().then(res => {
    //  this.userInfo = res.json();
    //  this.loaderService.toggleLoader(false);
    //})
  }
}
