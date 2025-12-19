import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  template: `
    <div class="contact-page">
      <div class="container">
        <h1>Contact Us</h1>
        
        <div class="contact-content">
          <div class="contact-info">
            <h2>Get in Touch</h2>
            <div class="info-item">
              <h3>Address</h3>
              <p>123 University Avenue<br>City, State 12345</p>
            </div>
            <div class="info-item">
              <h3>Phone</h3>
              <p>(555) 123-4567</p>
            </div>
            <div class="info-item">
              <h3>Email</h3>
              <p>info@department.edu</p>
            </div>
            <div class="info-item">
              <h3>Office Hours</h3>
              <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
            </div>
          </div>
          
          <div class="contact-form">
            <h2>Send us a Message</h2>
            <form (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" [(ngModel)]="contactForm.name" name="name" required>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" [(ngModel)]="contactForm.email" name="email" required>
              </div>
              <div class="form-group">
                <label for="subject">Subject</label>
                <input type="text" id="subject" [(ngModel)]="contactForm.subject" name="subject" required>
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" [(ngModel)]="contactForm.message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" class="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-page {
      padding: 2rem 0;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    h1 {
      color: #2c3e50;
      margin-bottom: 2rem;
    }
    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }
    .info-item {
      margin-bottom: 2rem;
    }
    .info-item h3 {
      color: #34495e;
      margin-bottom: 0.5rem;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #34495e;
      font-weight: bold;
    }
    input, textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .submit-btn {
      background: #3498db;
      color: white;
      padding: 0.75rem 2rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }
    .submit-btn:hover {
      background: #2980b9;
    }
    @media (max-width: 768px) {
      .contact-content {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    console.log('Form submitted:', this.contactForm);
    alert('Thank you for your message! We will get back to you soon.');
    this.contactForm = { name: '', email: '', subject: '', message: '' };
  }
}