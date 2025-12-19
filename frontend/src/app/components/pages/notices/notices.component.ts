import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PdfButtonComponent } from '../../shared/pdf-button/pdf-button.component';

interface Notice {
  id: number;
  title: string;
  date: string;
  description: string;
  pdfUrl: string;
}

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [CommonModule, NgForOf, PdfButtonComponent],
  template: `
    <div class="notices-page">
      <div class="container">
        <h1>Notices & Announcements</h1>
        <p class="intro">Stay updated with the latest notices and announcements from our department.</p>
        
        <div class="notices-grid">
          <div class="notice-card" *ngFor="let notice of notices">
            <div class="notice-header">
              <h3>{{ notice.title }}</h3>
              <span class="date">{{ notice.date }}</span>
            </div>
            <p class="description">{{ notice.description }}</p>
            <app-pdf-button 
              [pdfUrl]="notice.pdfUrl" 
              label="View Notice">
            </app-pdf-button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .notices-page {
      padding: 2rem 0;
    }
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    h1 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }
    .intro {
      margin-bottom: 3rem;
      font-size: 1.1rem;
      color: #7f8c8d;
    }
    .notices-grid {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .notice-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      border-left: 4px solid #e74c3c;
      transition: transform 0.3s;
    }
    .notice-card:hover {
      transform: translateX(5px);
    }
    .notice-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      gap: 1rem;
    }
    .notice-header h3 {
      color: #2c3e50;
      margin: 0;
      flex: 1;
    }
    .date {
      background: #e74c3c;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.85rem;
      white-space: nowrap;
    }
    .description {
      color: #34495e;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    @media (max-width: 768px) {
      .notice-header {
        flex-direction: column;
      }
    }
  `]
})
export class NoticesComponent implements OnInit {
  notices: Notice[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Notice[]>('assets/data/notices.json').subscribe({
      next: (data) => this.notices = data,
      error: (err) => console.error('Error loading notices data:', err)
    });
  }
}