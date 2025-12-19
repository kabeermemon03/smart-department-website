import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="container">
        <div class="logo">
          <img src="assets/images/logo.png" alt="Department Logo" class="logo-img">
          <div class="logo-text">
            <h1>Electronics Engineering</h1>
            <span>Department</span>
          </div>
        </div>
        <nav class="nav">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a routerLink="/about" routerLinkActive="active">About</a>
          <a routerLink="/faculty" routerLinkActive="active">Faculty</a>
          <a routerLink="/academics" routerLinkActive="active">Academics</a>
          <a routerLink="/results" routerLinkActive="active">Results</a>
          <a routerLink="/notices" routerLinkActive="active">Notices</a>
          <a routerLink="/contact" routerLinkActive="active">Contact</a>
        </nav>
        <div class="mobile-menu" (click)="toggleMobileMenu()">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: #ffffff;
      box-shadow: 0 2px 20px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
      border-bottom: 4px solid #1e3a8a;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .logo-img {
      width: 50px;
      height: 50px;
      border-radius: 8px;
    }
    .logo-text h1 {
      margin: 0;
      font-size: 1.5rem;
      color: #1e3a8a;
      font-weight: 700;
      line-height: 1.2;
    }
    .logo-text span {
      font-size: 0.9rem;
      color: #3b82f6;
      font-weight: 500;
    }
    .nav {
      display: flex;
      gap: 0;
    }
    .nav a {
      color: #1e40af;
      text-decoration: none;
      padding: 1rem 1.5rem;
      font-weight: 500;
      font-size: 1rem;
      position: relative;
      transition: all 0.3s ease;
      border-radius: 8px;
      margin: 0 0.25rem;
    }
    .nav a:hover {
      color: #1e3a8a;
      background: #eff6ff;
      transform: translateY(-2px);
    }
    .nav a.active {
      color: #ffffff;
      background: linear-gradient(135deg, #1e3a8a, #3b82f6);
      box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3);
    }
    .nav a::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      background: #1e3a8a;
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }
    .nav a:hover::after {
      width: 80%;
    }
    .nav a.active::after {
      width: 0;
    }
    .mobile-menu {
      display: none;
      flex-direction: column;
      cursor: pointer;
      gap: 4px;
    }
    .mobile-menu span {
      width: 25px;
      height: 3px;
      background: #2c3e50;
      border-radius: 2px;
      transition: 0.3s;
    }
    @media (max-width: 768px) {
      .nav {
        display: none;
      }
      .mobile-menu {
        display: flex;
      }
      .container {
        padding: 1rem;
      }
    }
  `]
})
export class HeaderComponent {
  toggleMobileMenu() {
    // Mobile menu toggle logic
  }
}