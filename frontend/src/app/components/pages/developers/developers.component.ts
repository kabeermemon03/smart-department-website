import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-developers',
  imports: [CommonModule],
  templateUrl: './developers.component.html',
  styleUrl: './developers.component.css'
})
export class DevelopersComponent {
  developers = [
    {
      name: 'Ahmed Khan',
      role: 'Lead Developer',
      email: 'ahmed.khan@muet.edu.pk',
      phone: '+92 300 1234567',
      skills: ['Angular', 'TypeScript', 'Node.js', 'System Architecture'],
      image: 'assets/images/dev1.jpg',
      color: '#3b82f6'
    },
    {
      name: 'Sara Ali', 
      role: 'Database Handler',
      email: 'sara.ali@muet.edu.pk',
      phone: '+92 300 2345678',
      skills: ['MongoDB', 'PostgreSQL', 'Data Modeling', 'API Integration'],
      image: 'assets/images/dev2.jpg',
      color: '#8b5cf6'
    },
    {
      name: 'Fatima Raza',
      role: 'UI/UX Designer', 
      email: 'fatima.raza@muet.edu.pk',
      phone: '+92 300 3456789',
      skills: ['Figma', 'Adobe XD', 'CSS Animations', 'Responsive Design'],
      image: 'assets/images/dev3.jpg',
      color: '#ec4899'
    }
  ];

  getRoleIcon(role: string): string {
    switch(role) {
      case 'Lead Developer': return '👨‍💻';
      case 'Database Handler': return '🗄️';
      case 'UI/UX Designer': return '🎨';
      default: return '💼';
    }
  }

  openEmail(email: string) {
    window.open(`mailto:${email}`);
  }

  openPhone(phone: string) {
    window.open(`tel:${phone}`);
  }
}