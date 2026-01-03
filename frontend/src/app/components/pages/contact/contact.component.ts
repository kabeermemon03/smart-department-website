import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../services/firebase.service';
import { ToastService } from '../../../services/toast.service';

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

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  async submit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.toastService.warning('Form Invalid', 'Please fill in all required fields correctly.');
      return;
    }

    this.submitting = true;

    try {
      const messageData = {
        ...this.contactForm.value,
        timestamp: new Date().toISOString(),
        status: 'unread'
      };

      await addDoc(collection(db, 'contact-messages'), messageData);
      
      this.toastService.success(
        'Message Sent Successfully!', 
        'Thank you for contacting us. We will get back to you within 24 hours.'
      );
      
      this.contactForm.reset();
    } catch (error) {
      console.error('Error sending message:', error);
      this.toastService.error(
        'Failed to Send Message', 
        'There was an error sending your message. Please try again or contact us directly.'
      );
    } finally {
      this.submitting = false;
    }
  }
}