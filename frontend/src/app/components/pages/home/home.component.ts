import { Component } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { HeroComponent } from '../../shared/hero/hero.component';
import { CardComponent } from '../../shared/card/card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgForOf, HeroComponent, CardComponent, RouterLink],
  template: `
    <app-hero 
      title="Welcome to Electronics Engineering Department" 
      subtitle="Innovating Tomorrow's Electronic Systems Through Excellence in Education and Research">
    </app-hero>
    
    <section class="quick-links">
      <div class="container">
        <div class="section-header">
          <h2>Quick Access</h2>
          <p>Navigate to important sections quickly</p>
        </div>
        <div class="links-grid">
          <a routerLink="/academics" class="quick-link academics">
            <div class="link-icon">🎓</div>
            <h3>Academics</h3>
            <p>Programs & Courses</p>
            <span class="link-arrow">→</span>
          </a>
          <a routerLink="/results" class="quick-link results">
            <div class="link-icon">📊</div>
            <h3>Results</h3>
            <p>Examination Results</p>
            <span class="link-arrow">→</span>
          </a>
          <a routerLink="/notices" class="quick-link notices">
            <div class="link-icon">📢</div>
            <h3>Notices</h3>
            <p>Latest Announcements</p>
            <span class="link-arrow">→</span>
          </a>
          <a routerLink="/faculty" class="quick-link faculty">
            <div class="link-icon">👥</div>
            <h3>Faculty</h3>
            <p>Meet Our Team</p>
            <span class="link-arrow">→</span>
          </a>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <div class="section-header">
          <h2>Why Choose Us</h2>
          <p>Excellence that sets us apart</p>
        </div>
        <div class="features-grid">
          <app-card 
            title="Advanced Electronics"
            content="Cutting-edge curriculum in analog, digital, and power electronics designed by industry experts"
            icon="⚡"
            buttonText="Learn More">
          </app-card>
          <app-card 
            title="Research Excellence"
            content="Pioneering research in IoT, Embedded Systems, VLSI Design, and Signal Processing"
            icon="🔬"
            buttonText="Explore Research">
          </app-card>
          <app-card 
            title="Industry Partnerships"
            content="Strong collaborations with leading electronics companies for internships and placements"
            icon="🏭"
            buttonText="View Partners">
          </app-card>
        </div>
      </div>
    </section>

    <section class="latest-news">
      <div class="container">
        <div class="section-header">
          <h2>Latest Updates</h2>
          <p>Stay informed with our recent achievements and announcements</p>
        </div>
        <div class="news-grid">
          <div class="news-card" *ngFor="let news of latestNews">
            <div class="news-date">{{ news.date }}</div>
            <h3>{{ news.title }}</h3>
            <p>{{ news.summary }}</p>
            <a href="#" class="read-more">Read More →</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .quick-links {
      padding: 5rem 0;
      background: #f8f9fa;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }
    .section-header h2 {
      font-size: 2.5rem;
      color: #2c3e50;
      font-weight: 800;
      margin-bottom: 1rem;
    }
    .section-header p {
      font-size: 1.2rem;
      color: #7f8c8d;
      font-weight: 300;
    }
    .links-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }
    .quick-link {
      display: block;
      padding: 2.5rem;
      background: white;
      border-radius: 20px;
      text-decoration: none;
      color: inherit;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      box-shadow: 0 5px 20px rgba(0,0,0,0.08);
    }
    .quick-link::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      transition: all 0.3s ease;
    }
    .quick-link.academics::before { background: linear-gradient(90deg, #1e3a8a, #3b82f6); }
    .quick-link.results::before { background: linear-gradient(90deg, #dc2626, #ef4444); }
    .quick-link.notices::before { background: linear-gradient(90deg, #f59e0b, #f97316); }
    .quick-link.faculty::before { background: linear-gradient(90deg, #7c3aed, #8b5cf6); }
    
    .quick-link:hover {
      transform: translateY(-8px);
      box-shadow: 0 15px 35px rgba(0,0,0,0.15);
    }
    .link-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      display: block;
    }
    .quick-link h3 {
      margin-bottom: 0.5rem;
      color: #2c3e50;
      font-size: 1.4rem;
      font-weight: 700;
    }
    .quick-link p {
      margin: 0;
      color: #7f8c8d;
      font-size: 1rem;
      line-height: 1.5;
    }
    .link-arrow {
      position: absolute;
      top: 2rem;
      right: 2rem;
      font-size: 1.5rem;
      color: #1e3a8a;
      transition: all 0.3s ease;
    }
    .quick-link:hover .link-arrow {
      transform: translateX(5px);
    }
    .features {
      padding: 5rem 0;
      background: white;
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2.5rem;
    }
    .latest-news {
      padding: 5rem 0;
      background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
      color: white;
    }
    .latest-news .section-header h2,
    .latest-news .section-header p {
      color: white;
    }
    .news-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }
    .news-card {
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      padding: 2rem;
      border: 1px solid rgba(255,255,255,0.2);
      transition: all 0.3s ease;
    }
    .news-card:hover {
      transform: translateY(-5px);
      background: rgba(255,255,255,0.15);
    }
    .news-date {
      background: rgba(255,255,255,0.2);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
      display: inline-block;
      margin-bottom: 1rem;
    }
    .news-card h3 {
      color: white;
      margin-bottom: 1rem;
      font-size: 1.3rem;
      font-weight: 700;
    }
    .news-card p {
      color: rgba(255,255,255,0.9);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .read-more {
      color: white;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .read-more:hover {
      text-decoration: underline;
    }
    @media (max-width: 768px) {
      .container {
        padding: 0 1rem;
      }
      .section-header h2 {
        font-size: 2rem;
      }
      .links-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {
  latestNews = [
    { title: 'New VLSI Design Lab Inaugurated', date: 'March 15, 2024', summary: 'State-of-the-art VLSI design facility with advanced EDA tools for chip design and verification projects.' },
    { title: 'Students Win IEEE Electronics Competition', date: 'March 10, 2024', summary: 'Our electronics engineering students secured first place in the National IEEE Circuit Design Challenge.' },
    { title: 'Industry Partnership with Tech Giants', date: 'March 5, 2024', summary: 'Strategic collaboration with leading semiconductor companies to enhance curriculum and research opportunities.' }
  ];
}