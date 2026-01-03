import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface FacultyMember {
  id: number;
  name: string;
  designation: string;
  email: string;
  photo: string;
  research: string;
  qualification: string;
  phone: string;
  office: string;
}

interface Laboratory {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  capacity: number;
  features: string[];
  equipment: string[];
  supervisor: string;
  location: string;
  color: string;
  icon: string;
}

@Component({
  selector: 'app-faculty',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './faculty.component.html',
  styleUrl: './faculty.component.css'
})
export class FacultyComponent implements OnInit {
  allFaculty: FacultyMember[] = [];
  chairperson: FacultyMember | null = null;
  professors: FacultyMember[] = [];
  associateProfessors: FacultyMember[] = [];
  assistantProfessors: FacultyMember[] = [];
  lecturers: FacultyMember[] = [];
  technicalStaff: FacultyMember[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadFacultyData();
    this.setupLaboratories();
  }

  loadFacultyData() {
    this.http.get<FacultyMember[]>('assets/data/faculty.json').subscribe({
      next: (data) => {
        this.allFaculty = data;
        this.categorizeFaculty();
      },
      error: (error) => {
        console.error('Error loading faculty data:', error);
        this.setDefaultData();
      }
    });
  }

  categorizeFaculty() {
    this.chairperson = this.allFaculty.find(f => f.designation.toLowerCase().includes('chairperson')) || null;
    this.professors = this.allFaculty.filter(f => f.designation.toLowerCase().includes('professor') && !f.designation.toLowerCase().includes('associate') && !f.designation.toLowerCase().includes('assistant') && !f.designation.toLowerCase().includes('chairperson'));
    this.associateProfessors = this.allFaculty.filter(f => f.designation.toLowerCase().includes('associate professor'));
    this.assistantProfessors = this.allFaculty.filter(f => f.designation.toLowerCase().includes('assistant professor'));
    this.lecturers = this.allFaculty.filter(f => f.designation.toLowerCase().includes('lecturer'));
  }

  setDefaultData() {
    // Fallback data in case JSON loading fails
    this.chairperson = {
      id: 1,
      name: 'Prof. Dr. Wajiha Shah',
      designation: 'Professor Emeritus & Chairperson',
      qualification: 'Ph.D. (Austria)',
      email: 'wajiha.shah@admin.muet.edu.pk',
      phone: '+92-22-2772250-70',
      office: 'EE-201',
      photo: '',
      research: 'Electronics Engineering'
    };
  }

  setupLaboratories() {
    this.laboratories = [
      {
        id: 1,
        name: 'Electronics & Communication Lab',
        description: 'Advanced laboratory for analog and digital electronics experiments, circuit analysis, and communication systems testing.',
        shortDescription: 'Analog & Digital Electronics',
        image: 'assets/images/labs/electronics-lab.jpg',
        capacity: 30,
        features: [
          'Digital Oscilloscopes',
          'Function Generators', 
          'Power Supplies',
          'Multimeters',
          'Breadboards & Components'
        ],
        equipment: [
          'Oscilloscopes',
          'Signal Generators', 
          'Spectrum Analyzers',
          'Logic Analyzers',
          'Component Testers'
        ],
        supervisor: 'Dr. Khurram Shaikh',
        location: 'EE-Lab-01, Ground Floor',
        color: '#3b82f6',
        icon: '🔌'
      },
      {
        id: 2,
        name: 'Power Electronics Lab',
        description: 'Specialized facility for power systems, motor drives, renewable energy systems, and high-voltage experiments.',
        shortDescription: 'Power Systems & Motor Drives',
        image: 'assets/images/labs/power-lab.jpg',
        capacity: 25,
        features: [
          'Motor Drive Systems',
          'Power Converters',
          'Solar Panel Setup',
          'High Voltage Equipment',
          'Safety Protocols'
        ],
        equipment: [
          'AC/DC Motors',
          'Inverters',
          'Transformers',
          'Power Meters',
          'Protection Relays'
        ],
        supervisor: 'Engr. Shoaib Khaskheli',
        location: 'EE-Lab-02, First Floor',
        color: '#f59e0b',
        icon: '⚡'
      },
      {
        id: 3,
        name: 'Digital Systems Lab',
        description: 'Modern laboratory for digital logic design, FPGA programming, microcontroller development, and embedded systems.',
        shortDescription: 'Digital Logic & FPGA Design',
        image: 'assets/images/labs/digital-lab.jpg',
        capacity: 35,
        features: [
          'FPGA Development Boards',
          'Microcontroller Kits',
          'Logic Analyzers',
          'Programming Software',
          'Simulation Tools'
        ],
        equipment: [
          'Xilinx FPGAs',
          'Arduino Boards',
          'Raspberry Pi',
          'Logic Gates',
          'Development Kits'
        ],
        supervisor: 'Engr. Salim Ali Lashari',
        location: 'EE-Lab-03, Second Floor',
        color: '#8b5cf6',
        icon: '💻'
      }
    ];

    this.technicalStaff = [
      {
        id: 27,
        name: 'Dr. Khurram Shaikh',
        designation: 'Lab Engineer',
        qualification: 'Ph.D.',
        research: 'Laboratory Management',
        email: 'khurram.shaikh@admin.muet.edu.pk',
        phone: '+92-22-2772250-70',
        office: 'EE-Lab-01',
        photo: ''
      },
      {
        id: 28,
        name: 'Dr. Azam Memon',
        designation: 'Instrumentation Engineer (On Study Leave)',
        qualification: 'Ph.D. (China), M.E. (MUET, Pakistan), B.E. (MUET, Pakistan)',
        research: 'Instrumentation',
        email: 'azam.memon@admin.muet.edu.pk',
        phone: '+92-22-2772250-70 Ext: (4120)',
        office: 'EE-Lab-02',
        photo: ''
      },
      {
        id: 29,
        name: 'Engr. Shoaib Khaskheli',
        designation: 'Instrumentation Engineer',
        qualification: 'M.E. (MUET Pakistan), B.E. (MUET Pakistan)',
        research: 'Instrumentation',
        email: 'shoaib.khaskheli@admin.muet.edu.pk',
        phone: '+92-22-2772250-70',
        office: 'EE-Lab-03',
        photo: ''
      },
      {
        id: 30,
        name: 'Engr. Salim Ali Lashari',
        designation: 'Lab Supervisor',
        qualification: 'B.E. (MUET Pakistan)',
        research: 'Laboratory Operations',
        email: 'salim.lashari@admin.muet.edu.pk',
        phone: '+92-22-2772250-70',
        office: 'EE-Lab-04',
        photo: ''
      },
      {
        id: 31,
        name: 'Eng. Asma Channa',
        designation: 'Lab Supervisor (On Study Leave)',
        qualification: 'B.E. (MUET Pakistan)',
        research: 'Laboratory Operations',
        email: 'asma.channa@admin.muet.edu.pk',
        phone: '+92-22-2772250-70',
        office: 'EE-Lab-05',
        photo: ''
      },
      {
        id: 32,
        name: 'Engr. Burhan Aslam',
        designation: 'Lab Supervisor',
        qualification: 'B.E. (MUET Pakistan)',
        research: 'Laboratory Operations',
        email: 'burhan.aslam@admin.muet.edu.pk',
        phone: '+92-22-2772250-70',
        office: 'EE-Lab-06',
        photo: ''
      },
      {
        id: 33,
        name: 'Mr. Mohammad Ali Soomro',
        designation: 'Lab Supervisor',
        qualification: 'B.E. (MUET Pakistan)',
        research: 'Laboratory Operations',
        email: 'ali.soomro@admin.muet.edu.pk',
        phone: '+92-22-2772250-70',
        office: 'EE-Lab-07',
        photo: ''
      }
    ];
  }

  laboratories: Laboratory[] = [];

  openLabDetails(lab: Laboratory) {
    console.log('Opening details for:', lab.name);
  }
}