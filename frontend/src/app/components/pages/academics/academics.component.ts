import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PdfButtonComponent } from '../../shared/pdf-button/pdf-button.component';

interface Program {
  id: number;
  name: string;
  duration: string;
  description: string;
  syllabusUrl: string;
}

@Component({
  selector: 'app-academics',
  standalone: true,
  imports: [CommonModule, NgForOf, PdfButtonComponent],
  template: `
    <div class="academics-page">
      <div class="container">
        <h1>Academic Programs</h1>
        <p class="intro">Explore our comprehensive range of academic programs designed to prepare you for success in electronics engineering.</p>
        
        <div class="programs-grid">
          <div class="program-card" *ngFor="let program of programs">
            <h3>{{ program.name }}</h3>
            <p class="duration">Duration: {{ program.duration }}</p>
            <p class="description">{{ program.description }}</p>
            <app-pdf-button 
              [pdfUrl]="program.syllabusUrl" 
              label="View Syllabus">
            </app-pdf-button>
          </div>
        </div>

        <section class="semester-courses">
          <h2>Semester Courses</h2>
          <div class="courses-grid">
            <div class="semester-card" *ngFor="let semester of semesters">
              <h4>Semester {{ semester.number }}</h4>
              <ul>
                <li *ngFor="let course of semester.courses">{{ course }}</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .academics-page {
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
    .programs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      margin-bottom: 4rem;
    }
    .program-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .program-card h3 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }
    .duration {
      color: #1e3a8a;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    .description {
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }
    .semester-courses {
      margin-top: 3rem;
    }
    .semester-courses h2 {
      color: #2c3e50;
      margin-bottom: 2rem;
      border-bottom: 2px solid #1e3a8a;
      padding-bottom: 0.5rem;
    }
    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    .semester-card {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid #1e3a8a;
    }
    .semester-card h4 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }
    .semester-card ul {
      list-style: none;
      padding: 0;
    }
    .semester-card li {
      padding: 0.25rem 0;
      color: #34495e;
    }
  `]
})
export class AcademicsComponent implements OnInit {
  programs: Program[] = [];
  semesters = [
    { number: 1, courses: ['Circuit Analysis', 'Mathematics I', 'Physics', 'Engineering Drawing'] },
    { number: 2, courses: ['Electronic Devices', 'Mathematics II', 'Digital Logic', 'Programming'] },
    { number: 3, courses: ['Analog Electronics', 'Signals & Systems', 'Microprocessors', 'Control Systems'] },
    { number: 4, courses: ['Digital Electronics', 'Communication Systems', 'VLSI Design', 'Power Electronics'] }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Program[]>('assets/data/programs.json').subscribe({
      next: (data) => this.programs = data,
      error: (err) => console.error('Error loading programs data:', err)
    });
  }
}