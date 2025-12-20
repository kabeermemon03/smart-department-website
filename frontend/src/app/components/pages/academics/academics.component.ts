import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-academics',
  imports: [],
  templateUrl: './academics.component.html',
  styleUrl: './academics.component.css'
})
export class AcademicsComponent implements OnInit {

  ngOnInit() {
    this.initializeTabs();
  }

  private initializeTabs() {
    // Add event listeners for tab buttons
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