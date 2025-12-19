import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="loading-container">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    p {
      color: #7f8c8d;
      margin: 0;
    }
  `]
})
export class LoadingComponent {}