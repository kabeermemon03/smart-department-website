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

  uploadForm = {
    semester: '',
    course: '',
    title: '',
    file: null as File | null
  };

  uploadedResults: any[] = [];

  login() {
    // Simple authentication - replace with backend API call
    if (this.loginForm.username === 'admin' && this.loginForm.password === 'admin123') {
      this.isLoggedIn = true;
      this.loadResults();
    } else {
      alert('Invalid credentials');
    }
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
    if (this.uploadForm.file && this.uploadForm.semester && this.uploadForm.course && this.uploadForm.title) {
      // Simulate file upload - replace with backend API call
      const newResult = {
        id: Date.now(),
        title: this.uploadForm.title,
        semester: this.uploadForm.semester,
        course: this.uploadForm.course,
        fileName: this.uploadForm.file.name,
        uploadDate: new Date().toLocaleDateString(),
        fileUrl: URL.createObjectURL(this.uploadForm.file) // Temporary URL for demo
      };
      
      this.uploadedResults.push(newResult);
      this.saveToLocalStorage();
      this.resetUploadForm();
      alert('Result uploaded successfully!');
    } else {
      alert('Please fill all fields and select a PDF file');
    }
  }

  deleteResult(id: number) {
    if (confirm('Are you sure you want to delete this result?')) {
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