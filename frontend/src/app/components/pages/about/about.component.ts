import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="about-page">
      <div class="container">
        <h1>About Our Department</h1>
        
        <section class="overview">
          <h2>Department Overview</h2>
          <p>The Computer Science Department is a leading center for education and research in computing technologies. We offer comprehensive programs from undergraduate to doctoral levels.</p>
        </section>

        <section class="mission">
          <h2>Our Mission</h2>
          <p>To provide exceptional education in computer science and conduct groundbreaking research that advances knowledge and serves society's technological needs.</p>
        </section>

        <section class="hod-message">
          <h2>Head of Department Message</h2>
          <div class="hod-content">
            <div class="hod-photo">
              <img src="assets/images/hod.jpg" alt="Head of Department" />
            </div>
            <div class="hod-text">
              <p>"Welcome to our department. We are committed to fostering innovation, excellence in teaching, and cutting-edge research that prepares our students for the challenges of tomorrow."</p>
              <p><strong>- Dr. John Smith, Head of Department</strong></p>
            </div>
          </div>
        </section>

        <section class="history">
          <h2>Our History</h2>
          <p>Established in 1995, our department has been at the forefront of computer science education for nearly three decades. We have consistently evolved our curriculum and research focus to meet the demands of the rapidly changing technology landscape.</p>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .about-page {
      padding: 2rem 0;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    h1 {
      color: #2c3e50;
      margin-bottom: 2rem;
    }
    section {
      margin-bottom: 3rem;
    }
    h2 {
      color: #34495e;
      border-bottom: 2px solid #3498db;
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
    }
    .hod-content {
      display: flex;
      gap: 2rem;
      align-items: flex-start;
    }
    .hod-photo {
      flex-shrink: 0;
    }
    .hod-photo img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
    }
    .hod-text {
      flex: 1;
    }
    @media (max-width: 768px) {
      .hod-content {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class AboutComponent {}