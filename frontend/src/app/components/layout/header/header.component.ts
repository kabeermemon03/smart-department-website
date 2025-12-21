import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isScrolled = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.pageYOffset > 50;
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.onWindowScroll();
      
      // Scroll to top on route change
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        window.scrollTo(0, 0);
      });
    }
  }

  toggleMobileMenu() {
    // Mobile menu toggle logic
  }
}