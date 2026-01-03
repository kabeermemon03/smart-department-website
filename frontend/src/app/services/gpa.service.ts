import { Injectable } from '@angular/core';

export interface Subject {
  name: string;
  creditHours: number;
  grade: string;
  qualityPoints: number;
}

export interface GradePoint {
  grade: string;
  point: number;
}

@Injectable({
  providedIn: 'root'
})
export class GpaService {
  private gradePoints: GradePoint[] = [
    { grade: 'A+', point: 4.00 },
    { grade: 'A', point: 3.50 },
    { grade: 'B+', point: 3.00 },
    { grade: 'B', point: 2.50 },
    { grade: 'C+', point: 2.00 },
    { grade: 'C', point: 1.50 },
    { grade: 'C-', point: 1.00 },
    { grade: 'F', point: 0.00 }
  ];

  getGradePoints(): GradePoint[] {
    return this.gradePoints;
  }

  getGradePoint(grade: string): number {
    const gradePoint = this.gradePoints.find(gp => gp.grade === grade);
    return gradePoint ? gradePoint.point : 0;
  }

  calculateQualityPoints(creditHours: number, grade: string): number {
    return creditHours * this.getGradePoint(grade);
  }

  calculateGPA(subjects: Subject[]): { gpa: number; totalCreditHours: number; totalQualityPoints: number } {
    if (subjects.length === 0) {
      return { gpa: 0, totalCreditHours: 0, totalQualityPoints: 0 };
    }

    const totalCreditHours = subjects.reduce((sum, subject) => sum + subject.creditHours, 0);
    const totalQualityPoints = subjects.reduce((sum, subject) => sum + subject.qualityPoints, 0);
    const gpa = totalQualityPoints / totalCreditHours;

    return {
      gpa: parseFloat(gpa.toFixed(2)),
      totalCreditHours,
      totalQualityPoints: parseFloat(totalQualityPoints.toFixed(2))
    };
  }
}
