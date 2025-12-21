import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-academics',
  imports: [],
  templateUrl: './academics.component.html',
  styleUrl: './academics.component.css'
})
export class AcademicsComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.initializeTabs();
  }

  private initializeTabs() {
    // Add event listeners for tab buttons - only in browser
    if (isPlatformBrowser(this.platformId)) {
      const tabButtons = document.querySelectorAll('.tab-btn');
      const semesterContents = document.querySelectorAll('.semester-content');

      tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          const semester = target.getAttribute('data-semester');

          // Remove active class from all buttons and contents
          tabButtons.forEach(btn => btn.classList.remove('active'));
          semesterContents.forEach(content => content.classList.remove('active'));

          // Add active class to clicked button and corresponding content
          target.classList.add('active');
          const semesterContent = document.getElementById(`semester-${semester}`);
          if (semesterContent) {
            semesterContent.classList.add('active');
          }
        });
      });
    }
  }
}