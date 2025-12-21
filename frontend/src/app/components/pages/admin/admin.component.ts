import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  isLoggedIn = false;
  loginForm = {
    username: '',
    password: ''
  };
  // NOTE: Backend auth is required. Admin features are disabled until a backend is configured.
  backendConfigured = false;

  uploadForm = {
    semester: '',
    course: '',
    title: '',
    file: null as File | null
  };

  uploadedResults: any[] = [];

  login() {
    if (!this.backendConfigured) {
      alert('Admin area is disabled: no backend configured yet. Please configure backend authentication to enable admin features.');
      return;
    }
    // TODO: Implement real backend auth (API call, JWT/session) and remove any client-side checks.
  }

  logout() {
    this.isLoggedIn = false;
    this.loginForm = { username: '', password: '' };
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.uploadForm.file = file;
    } else {
      alert('Please select a PDF file');
    }
  }

  uploadResult() {
    if (!this.backendConfigured) {
      alert('Upload disabled: backend not configured. This will be enabled once a server API is available.');
      return;
    }
    // TODO: Implement secure backend upload and storage (S3/Cloud Storage) with auth.
  }

  deleteResult(id: number) {
    if (!this.backendConfigured) {
      alert('Delete disabled: backend not configured. This will be enabled once a server API is available.');
      return;
    }
    if (confirm('Are you sure you want to delete this result?')) {
      // TODO: call backend to delete
      this.uploadedResults = this.uploadedResults.filter(result => result.id !== id);
      this.saveToLocalStorage();
    }
  }

  resetUploadForm() {
    this.uploadForm = {
      semester: '',
      course: '',
      title: '',
      file: null
    };
  }

  loadResults() {
    const saved = localStorage.getItem('uploadedResults');
    if (saved) {
      this.uploadedResults = JSON.parse(saved);
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('uploadedResults', JSON.stringify(this.uploadedResults));
  }
}