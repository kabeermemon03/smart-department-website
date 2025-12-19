import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PdfButtonComponent } from '../../shared/pdf-button/pdf-button.component';

interface Result {
  id: number;
  title: string;
  semester: string;
  course: string;
  date: string;
  pdfUrl: string;
}

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, NgForOf, FormsModule, PdfButtonComponent],
  template: `
    <div class="results-page">
      <div class="container">
        <h1>Examination Results</h1>
        <p class="intro">Download your examination results from the links below.</p>
        
        <div class="filters">
          <div class="filter-group">
            <label for="semester">Filter by Semester:</label>
            <select id="semester" [(ngModel)]="selectedSemester" name="semester" (change)="filterResults()">
              <option value="">All Semesters</option>
              <option value="2">Semester 2</option>
              <option value="4">Semester 4</option>
              <option value="6">Semester 6</option>
            </select>
          </div>
          <div class="filter-group">
            <label for="course">Filter by Course:</label>
            <select id="course" [(ngModel)]="selectedCourse" name="course" (change)="filterResults()">
              <option value="">All Courses</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
            </select>
          </div>
        </div>

        <div class="results-grid">
          <div class="result-card" *ngFor="let result of filteredResults">
            <div class="result-info">
              <h3>{{ result.title }}</h3>
              <p class="meta">{{ result.course }} - Semester {{ result.semester }}</p>
              <p class="date">Published: {{ result.date }}</p>
            </div>
            <div class="result-action">
              <app-pdf-button 
                [pdfUrl]="result.pdfUrl" 
                label="Download Result">
              </app-pdf-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .results-page {
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
      margin-bottom: 2rem;
      font-size: 1.1rem;
      color: #7f8c8d;
    }
    .filters {
      display: flex;
      gap: 2rem;
      margin-bottom: 3rem;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .filter-group label {
      font-weight: bold;
      color: #34495e;
    }
    .filter-group select {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .results-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .result-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      border-left: 4px solid #3498db;
    }
    .result-info h3 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }
    .meta {
      color: #3498db;
      font-weight: bold;
      margin-bottom: 0.25rem;
    }
    .date {
      color: #7f8c8d;
      font-size: 0.9rem;
      margin: 0;
    }
    @media (max-width: 768px) {
      .filters {
        flex-direction: column;
      }
      .result-card {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
    }
  `]
})
export class ResultsComponent implements OnInit {
  results: Result[] = [];
  filteredResults: Result[] = [];
  selectedSemester: string = '';
  selectedCourse: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Result[]>('assets/data/results.json').subscribe({
      next: (data) => {
        this.results = data;
        this.filteredResults = data;
      },
      error: (err) => console.error('Error loading results data:', err)
    });
  }

  filterResults() {
    this.filteredResults = this.results.filter(result => {
      const semesterMatch = !this.selectedSemester || result.semester === this.selectedSemester;
      const courseMatch = !this.selectedCourse || result.course === this.selectedCourse;
      return semesterMatch && courseMatch;
    });
  }
}