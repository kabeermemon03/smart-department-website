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
    
    <!-- Department Showcase Section -->
    <section class="department-showcase">
      <div class="container">
        <div class="showcase-content">
          <div class="showcase-image">
            <img src="assets/images/department-front.jpg" alt="Electronics Engineering Department Building" class="dept-image">
            <div class="image-overlay">
              <div class="overlay-content">
                <h3>Our Modern Facilities</h3>
                <p>State-of-the-art laboratories and research centers</p>
              </div>
            </div>
          </div>
          <div class="showcase-info">
            <div class="info-card">
              <div class="card-icon">🏛️</div>
              <h4>Established</h4>
              <p>1995</p>
            </div>
            <div class="info-card">
              <div class="card-icon">👨‍🎓</div>
              <h4>Students</h4>
              <p>500+</p>
            </div>
            <div class="info-card">
              <div class="card-icon">👨‍🏫</div>
              <h4>Faculty</h4>
              <p>25+</p>
            </div>
            <div class="info-card">
              <div class="card-icon">🔬</div>
              <h4>Labs</h4>
              <p>12</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Chairperson Message Section -->
    <section class="chairperson-message">
      <div class="container">
        <div class="message-content">
          <div class="chairperson-info">
            <div class="chairperson-photo">
              <img src="assets/images/chairperson.jpg" alt="Chairperson" class="chair-image">
            </div>
            <div class="chairperson-details">
              <h3>Dr. Sarah Ahmed</h3>
              <p class="title">Chairperson</p>
              <p class="department">Electronics Engineering Department</p>
            </div>
          </div>
          <div class="message-text">
            <h2>Message from Chairperson</h2>
            <blockquote>
              "Welcome to the Electronics Engineering Department at MUET. Our department is committed to providing world-class education and fostering innovation in the field of electronics engineering. We strive to prepare our students for the challenges of tomorrow's technological landscape through cutting-edge research and industry partnerships."
            </blockquote>
            <div class="signature">
              <p><strong>Dr. Sarah Ahmed</strong></p>
              <p>Chairperson, Electronics Engineering</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- University Links Section -->
    <section class="university-links">
      <div class="container">
        <div class="section-header">
          <h2>University Services</h2>
          <p>Quick access to essential university resources and services</p>
        </div>
        <div class="services-grid">
          <a href="#" class="service-link facebook">
            <div class="service-icon">📱</div>
            <h4>Facebook Official Page</h4>
            <p>MUET</p>
          </a>
          <a href="#" class="service-link notifications">
            <div class="service-icon">🔔</div>
            <h4>University Notifications</h4>
            <p>Latest Updates</p>
          </a>
          <a href="#" class="service-link mis">
            <div class="service-icon">📊</div>
            <h4>MIS MUET</h4>
            <p>Management System</p>
          </a>
          <a href="#" class="service-link fee">
            <div class="service-icon">💳</div>
            <h4>Generate Fee Challan</h4>
            <p>Payment Portal</p>
          </a>
          <a href="#" class="service-link exam">
            <div class="service-icon">📝</div>
            <h4>Examination Department</h4>
            <p>Results & Schedules</p>
          </a>
          <a href="#" class="service-link gpa">
            <div class="service-icon">🧮</div>
            <h4>GPA Calculator</h4>
            <p>Calculate CGPA</p>
          </a>
        </div>
      </div>
    </section>
    
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
    
    /* Department Showcase Section */
    .department-showcase {
      padding: 4rem 0;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    }
    
    .showcase-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 3rem;
      align-items: center;
    }
    
    .showcase-image {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
    
    .showcase-image:hover {
      transform: translateY(-10px);
    }
    
    .dept-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .showcase-image:hover .dept-image {
      transform: scale(1.05);
    }
    
    .image-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(30, 58, 138, 0.9));
      color: white;
      padding: 2rem;
      transform: translateY(100%);
      transition: transform 0.3s ease;
    }
    
    .showcase-image:hover .image-overlay {
      transform: translateY(0);
    }
    
    .overlay-content h3 {
      margin-bottom: 0.5rem;
      font-size: 1.5rem;
    }
    
    .overlay-content p {
      margin: 0;
      opacity: 0.9;
    }
    
    .showcase-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }
    
    .info-card {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }
    
    .info-card:hover {
      transform: translateY(-5px);
      border-color: #1e3a8a;
      box-shadow: 0 15px 40px rgba(30, 58, 138, 0.2);
    }
    
    .card-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      display: block;
    }
    
    .info-card h4 {
      color: #1e3a8a;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
      font-weight: 600;
    }
    
    .info-card p {
      color: #64748b;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
    }
    
    @media (max-width: 1024px) {
      .showcase-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .dept-image {
        height: 300px;
      }
    }
    
    @media (max-width: 768px) {
      .showcase-info {
        grid-template-columns: 1fr;
      }
      
      .dept-image {
        height: 250px;
      }
    }
    
    /* Chairperson Message Section */
    .chairperson-message {
      padding: 5rem 0;
      background: white;
    }
    
    .message-content {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 4rem;
      align-items: center;
    }
    
    .chairperson-info {
      text-align: center;
    }
    
    .chairperson-photo {
      margin-bottom: 2rem;
    }
    
    .chair-image {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid #1e3a8a;
      box-shadow: 0 10px 30px rgba(30, 58, 138, 0.3);
    }
    
    .chairperson-details h3 {
      color: #1e3a8a;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    
    .title {
      color: #3b82f6;
      font-weight: 600;
      font-size: 1.1rem;
      margin-bottom: 0.25rem;
    }
    
    .department {
      color: #64748b;
      font-size: 0.9rem;
    }
    
    .message-text h2 {
      color: #1e3a8a;
      margin-bottom: 2rem;
      font-size: 2rem;
    }
    
    blockquote {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #374151;
      font-style: italic;
      margin-bottom: 2rem;
      padding-left: 2rem;
      border-left: 4px solid #3b82f6;
    }
    
    .signature p {
      margin: 0.25rem 0;
      color: #64748b;
    }
    
    /* University Links Section */
    .university-links {
      padding: 5rem 0;
      background: #f8fafc;
    }
    
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
    
    .service-link {
      display: block;
      background: white;
      padding: 2rem;
      border-radius: 15px;
      text-decoration: none;
      color: inherit;
      text-align: center;
      transition: all 0.3s ease;
      box-shadow: 0 5px 15px rgba(0,0,0,0.08);
      border: 2px solid transparent;
    }
    
    .service-link:hover {
      transform: translateY(-5px);
      border-color: #1e3a8a;
      box-shadow: 0 10px 25px rgba(30, 58, 138, 0.15);
    }
    
    .service-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      display: block;
    }
    
    .service-link h4 {
      color: #1e3a8a;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
      font-weight: 600;
    }
    
    .service-link p {
      color: #64748b;
      margin: 0;
      font-size: 0.9rem;
    }
    
    @media (max-width: 768px) {
      .message-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
      }
      
      .chair-image {
        width: 150px;
        height: 150px;
      }
      
      .services-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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