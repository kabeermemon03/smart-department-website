import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="card">
      <div class="card-icon">
        <div class="icon-circle">
          <span class="icon">{{ icon }}</span>
        </div>
      </div>
      <div class="card-content">
        <h3>{{ title }}</h3>
        <p>{{ content }}</p>
      </div>
      <div class="card-footer" *ngIf="buttonText">
        <button class="card-btn">{{ buttonText }}</button>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: #ffffff;
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      border: 1px solid #f0f0f0;
    }
    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #1e3a8a, #3b82f6, #60a5fa);
    }
    .card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    }
    .card-icon {
      text-align: center;
      margin-bottom: 1.5rem;
    }
    .icon-circle {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1e3a8a, #3b82f6);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      box-shadow: 0 8px 25px rgba(30, 58, 138, 0.3);
    }
    .icon {
      font-size: 2rem;
      color: white;
    }
    .card-content {
      text-align: center;
    }
    .card-content h3 {
      color: #2c3e50;
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 1rem;
      line-height: 1.3;
    }
    .card-content p {
      color: #7f8c8d;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      font-size: 1rem;
    }
    .card-footer {
      text-align: center;
    }
    .card-btn {
      background: linear-gradient(135deg, #1e3a8a, #3b82f6);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 25px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 0.9rem;
    }
    .card-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(30, 58, 138, 0.4);
    }
  `]
})
export class CardComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() icon: string = '📚';
  @Input() buttonText: string = '';
}