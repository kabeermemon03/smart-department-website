import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

interface ResultFile {
  id: string;
  title: string;
  semester: string;
  year: string;
  type: 'midterm' | 'final' | 'supplementary';
  uploadDate: string;
  fileName: string;
  fileUrl: string;
}

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, NgForOf, FormsModule, RouterLink],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
  results: ResultFile[] = [];
  filteredResults: ResultFile[] = [];
  selectedSemester: string = 'all';
  selectedYear: string = 'all';
  selectedType: string = 'all';

  // Sample static data (will be replaced with backend data)
  staticResults: ResultFile[] = [
    {
      id: '1',
      title: 'Final Examination Results - Fall 2023',
      semester: '1',
      year: '2023',
      type: 'final',
      uploadDate: '2023-12-15',
      fileName: 'final_results_fall_2023.pdf',
      fileUrl: '#'
    },
    {
      id: '2',
      title: 'Midterm Examination Results - Fall 2023',
      semester: '1',
      year: '2023',
      type: 'midterm',
      uploadDate: '2023-10-20',
      fileName: 'midterm_results_fall_2023.pdf',
      fileUrl: '#'
    }
  ];

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.loadResults();
  }

  loadResults() {
    // Load static results
    this.results = [...this.staticResults];
    
    // Load uploaded results from localStorage (admin panel uploads) - only in browser
    if (isPlatformBrowser(this.platformId)) {
      const uploadedResults = localStorage.getItem('uploadedResults');
      if (uploadedResults) {
        const parsed = JSON.parse(uploadedResults);
        this.results = [...this.results, ...parsed];
      }
    }
    
    this.filteredResults = this.results;
    this.sortResultsByDate();
  }

  filterResults() {
    this.filteredResults = this.results.filter(result => {
      return (
        (this.selectedSemester === 'all' || result.semester === this.selectedSemester) &&
        (this.selectedYear === 'all' || result.year === this.selectedYear) &&
        (this.selectedType === 'all' || result.type === this.selectedType)
      );
    });
    this.sortResultsByDate();
  }

  sortResultsByDate() {
    this.filteredResults.sort((a, b) => 
      new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
    );
  }

  onSemesterChange(event: any) {
    this.selectedSemester = event.target.value;
    this.filterResults();
  }

  onYearChange(event: any) {
    this.selectedYear = event.target.value;
    this.filterResults();
  }

  onTypeChange(event: any) {
    this.selectedType = event.target.value;
    this.filterResults();
  }

  downloadResult(result: ResultFile) {
    // In future, this will download from backend
    console.log('Downloading:', result.fileName);
  }

  getTypeLabel(type: string): string {
    switch(type) {
      case 'midterm': return 'Mid-Term';
      case 'final': return 'Final';
      case 'supplementary': return 'Supplementary';
      default: return type;
    }
  }

  getTypeClass(type: string): string {
    switch(type) {
      case 'midterm': return 'type-midterm';
      case 'final': return 'type-final';
      case 'supplementary': return 'type-supplementary';
      default: return '';
    }
  }
}