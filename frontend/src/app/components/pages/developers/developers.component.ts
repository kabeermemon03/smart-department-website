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
      name: 'Muhammad Kabeer',
      role: 'Lead Developer',
      email: 'mknadeem721@gmail.com',
      phone: '+923141093137',
      linkedin: 'https://www.linkedin.com/in/muhammad-kabeer-a788a534b/',
      skills: ['Angular', 'TypeScript', 'Frontend Architecture', 'UI Development'],
      image: 'assets/images/MuhammadKabeer.jpeg',
      color: '#3b82f6'
    },
    {
      name: 'Muhammad Usaid', 
      role: 'Firebase Manager',
      email: 'usaidshaikh505@gmail.com',
      phone: '+923360553437',
      linkedin: 'https://www.linkedin.com/in/muhammad-usaid-465120383/',
      skills: ['Firebase', 'Cloud Database', 'Backend Integration', 'Data Management'],
      image: 'assets/images/MuhammadUsaid.jpeg',
      color: '#8b5cf6'
    },
    {
      name: 'Azeem Jam Tamachi',
      role: 'Full Stack Developer', 
      email: 'azeemjam100@gmail.com',
      phone: '+923033963612',
      linkedin: 'https://www.linkedin.com/in/azeem-jam-tamachi-00237a335/',
      skills: ['MERN Stack', 'System Design', 'API Development', 'DevOps'],
      image: 'assets/images/AzeemJamTamachi.jpeg',
      color: '#ec4899'
    }
  ];

  getRoleIcon(role: string): string {
    switch(role) {
      case 'Lead Developer': return '👨‍💻';
      case 'Firebase Manager': return '🔥';
      case 'Full Stack Developer': return '🚀';
      default: return '💼';
    }
  }

  openEmail(email: string) {
    window.open(`mailto:${email}`);
  }

  openPhone(phone: string) {
    window.open(`tel:${phone}`);
  }

  connectOnLinkedIn(linkedinUrl: string) {
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
  }
}