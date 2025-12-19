import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pdf-button',
  standalone: true,
  template: `
    <button class="pdf-button" (click)="downloadPdf()">
      <span class="icon">📄</span>
      {{ label }}
    </button>
  `,
  styles: [`
    .pdf-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #e74c3c;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: background 0.3s;
    }
    .pdf-button:hover {
      background: #c0392b;
    }
    .icon {
      font-size: 1rem;
    }
  `]
})
export class PdfButtonComponent {
  @Input() pdfUrl: string = '';
  @Input() label: string = 'Download PDF';

  downloadPdf() {
    if (this.pdfUrl) {
      window.open(this.pdfUrl, '_blank');
    }
  }
}