import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../services/firebase.service';

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
  staticResults: ResultFile[] = [];

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.loadResults();
  }

  loadResults() {
    // Load results from Firestore
    this.loadResultsFromFirestore();
  }

  async loadResultsFromFirestore() {
    try {
      const resultsCollection = collection(db, 'results');
      const resultsSnapshot = await getDocs(resultsCollection);
      const firebaseResults: ResultFile[] = resultsSnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      } as ResultFile));

      this.results = firebaseResults;
      this.filteredResults = this.results;
      this.sortResultsByDate();
    } catch (error) {
      console.error('Error loading results from Firestore:', error);
      // Fallback to empty array if Firestore fails
      this.results = [];
      this.filteredResults = [];
    }
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
    // Download the PDF file from the URL stored in Firestore
    if (result.fileUrl) {
      const link = document.createElement('a');
      link.href = result.fileUrl;
      link.download = result.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('No download URL available for this result');
    }
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