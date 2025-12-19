import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Faculty {
  id: number;
  name: string;
  designation: string;
  email: string;
  photo: string;
  research: string;
}

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [CommonModule, NgForOf],
  template: `
    <div class="faculty-page">
      <div class="container">
        <h1>Our Faculty</h1>
        <p class="intro">Meet our distinguished faculty members who are leaders in their fields.</p>
        
        <div class="faculty-grid">
          <div class="faculty-card" *ngFor="let member of facultyMembers">
            <div class="faculty-photo">
              <img [src]="member.photo" [alt]="member.name" />
            </div>
            <div class="faculty-info">
              <h3>{{ member.name }}</h3>
              <p class="designation">{{ member.designation }}</p>
              <p class="email">📧 {{ member.email }}</p>
              <p class="research"><strong>Research:</strong> {{ member.research }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .faculty-page {
      padding: 2rem 0;
    }
    .container {
      max-width: 1200px;
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
    .faculty-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }
    .faculty-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      overflow: hidden;
      transition: transform 0.3s;
    }
    .faculty-card:hover {
      transform: translateY(-5px);
    }
    .faculty-photo {
      text-align: center;
      padding: 2rem 2rem 1rem;
    }
    .faculty-photo img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid #1e3a8a;
    }
    .faculty-info {
      padding: 0 2rem 2rem;
      text-align: center;
    }
    .faculty-info h3 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }
    .designation {
      color: #1e3a8a;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    .email {
      color: #7f8c8d;
      margin-bottom: 1rem;
    }
    .research {
      color: #34495e;
      font-size: 0.9rem;
      line-height: 1.4;
    }
  `]
})
export class FacultyComponent implements OnInit {
  facultyMembers: Faculty[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Faculty[]>('assets/data/faculty.json').subscribe({
      next: (data) => this.facultyMembers = data,
      error: (err) => console.error('Error loading faculty data:', err)
    });
  }
}