import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  template: `
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">{{ title }}</h1>
          <p class="hero-subtitle">{{ subtitle }}</p>
          <div class="hero-buttons">
            <button class="btn-primary">Explore Programs</button>
            <button class="btn-secondary">Contact Us</button>
          </div>
        </div>
      </div>
      <div class="hero-decoration">
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);
      min-height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      color: white;
    }
    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.3);
      z-index: 1;
    }
    .hero-content {
      position: relative;
      z-index: 2;
      text-align: center;
      max-width: 800px;
      padding: 2rem;
    }
    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 1.5rem;
      line-height: 1.2;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      animation: fadeInUp 1s ease-out;
    }
    .hero-subtitle {
      font-size: 1.4rem;
      margin-bottom: 2.5rem;
      opacity: 0.95;
      font-weight: 300;
      line-height: 1.6;
      animation: fadeInUp 1s ease-out 0.2s both;
    }
    .hero-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      animation: fadeInUp 1s ease-out 0.4s both;
    }
    .btn-primary, .btn-secondary {
      padding: 1rem 2rem;
      border: none;
      border-radius: 50px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .btn-primary {
      background: #ffffff;
      color: #1e3a8a;
      box-shadow: 0 4px 15px rgba(255,255,255,0.3);
    }
    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(255,255,255,0.4);
    }
    .btn-secondary {
      background: transparent;
      color: white;
      border: 2px solid white;
    }
    .btn-secondary:hover {
      background: white;
      color: #1e3a8a;
      transform: translateY(-3px);
    }
    .floating-shapes {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
    }
    .shape {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.1);
      animation: float 6s ease-in-out infinite;
    }
    .shape-1 {
      width: 100px;
      height: 100px;
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }
    .shape-2 {
      width: 150px;
      height: 150px;
      top: 60%;
      right: 15%;
      animation-delay: 2s;
    }
    .shape-3 {
      width: 80px;
      height: 80px;
      bottom: 20%;
      left: 20%;
      animation-delay: 4s;
    }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }
      .hero-subtitle {
        font-size: 1.1rem;
      }
      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }
      .btn-primary, .btn-secondary {
        width: 200px;
      }
    }
  `]
})
export class HeroComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}