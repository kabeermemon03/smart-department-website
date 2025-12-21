import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  submitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  submit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.contactService.sendMessage(this.contactForm.value).subscribe({
      next: () => {
        this.successMessage = 'Message sent (simulated). Backend not configured.';
        this.contactForm.reset();
        this.submitting = false;
      },
      error: () => {
        this.errorMessage = 'Failed to send message. Backend not configured.';
        this.submitting = false;
      }
    });
  }
}