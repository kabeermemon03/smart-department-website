import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { GpaService, Subject, GradePoint } from '../../../services/gpa.service';

@Component({
  selector: 'app-gpa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gpa.html',
  styleUrl: './gpa.css',
})
export class GpaComponent implements OnInit {
  gpaForm: FormGroup;
  gradePoints: GradePoint[] = [];
  gpaResult: { gpa: number; totalCreditHours: number; totalQualityPoints: number } | null = null;

  constructor(
    private fb: FormBuilder,
    private gpaService: GpaService
  ) {
    this.gpaForm = this.fb.group({
      subjects: this.fb.array([])
    });
  }

  ngOnInit() {
    this.gradePoints = this.gpaService.getGradePoints();
    this.addSubject(); // Add one subject by default
  }

  get subjects(): FormArray {
    return this.gpaForm.get('subjects') as FormArray;
  }

  createSubject(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      creditHours: [3, [Validators.required, Validators.min(0.5), Validators.max(6)]],
      grade: ['A+', Validators.required]
    });
  }

  addSubject() {
    this.subjects.push(this.createSubject());
    this.calculateGPA();
  }

  removeSubject(index: number) {
    if (this.subjects.length > 1) {
      this.subjects.removeAt(index);
      this.calculateGPA();
    }
  }

  calculateGPA() {
    if (this.gpaForm.valid) {
      const subjects: Subject[] = this.subjects.controls.map(control => {
        const value = control.value;
        const qualityPoints = this.gpaService.calculateQualityPoints(value.creditHours, value.grade);
        return {
          name: value.name,
          creditHours: value.creditHours,
          grade: value.grade,
          qualityPoints
        };
      });

      this.gpaResult = this.gpaService.calculateGPA(subjects);
    } else {
      this.gpaResult = null;
    }
  }

  resetForm() {
    this.gpaForm = this.fb.group({
      subjects: this.fb.array([this.createSubject()])
    });
    this.gpaResult = null;
  }

  onInputChange() {
    this.calculateGPA();
  }
}
