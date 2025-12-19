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
      name: 'Developer 1',
      role: 'Full Stack Developer',
      email: 'dev1@example.com',
      phone: '+92 300 1234567',
      skills: ['Angular', 'Node.js', 'MongoDB'],
      image: 'assets/images/dev1.jpg'
    },
    {
      name: 'Developer 2', 
      role: 'Frontend Developer',
      email: 'dev2@example.com',
      phone: '+92 300 2345678',
      skills: ['React', 'Vue.js', 'CSS'],
      image: 'assets/images/dev2.jpg'
    },
    {
      name: 'Developer 3',
      role: 'Backend Developer', 
      email: 'dev3@example.com',
      phone: '+92 300 3456789',
      skills: ['Python', 'Django', 'PostgreSQL'],
      image: 'assets/images/dev3.jpg'
    }
  ];
}