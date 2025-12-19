import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  
  particles = [1,2,3,4,5,6,7,8,9,10];
}