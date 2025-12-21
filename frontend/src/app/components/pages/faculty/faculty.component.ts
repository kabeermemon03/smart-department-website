import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './faculty.component.html',
  styleUrl: './faculty.component.css'
})
export class FacultyComponent {
  laboratories: Laboratory[] = [
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
      supervisor: 'Engr. Ali Hassan',
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
      supervisor: 'Mr. Shahid Malik',
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
      supervisor: 'Ms. Farah Khan',
      location: 'EE-Lab-03, Second Floor',
      color: '#8b5cf6',
      icon: '💻'
    },
    {
      id: 4,
      name: 'VLSI Design Lab',
      description: 'State-of-the-art facility for VLSI chip design, layout verification, and semiconductor device characterization.',
      shortDescription: 'Chip Design & Verification',
      image: 'assets/images/labs/vlsi-lab.jpg',
      capacity: 20,
      features: [
        'EDA Software Tools',
        'High-Performance Workstations',
        'Layout Design Tools',
        'Simulation Environment',
        'Clean Room Access'
      ],
      equipment: [
        'Cadence Tools',
        'Synopsys Software',
        'Mentor Graphics',
        'Workstations',
        'Probe Stations'
      ],
      supervisor: 'Dr. Hassan Malik',
      location: 'EE-Lab-04, Third Floor',
      color: '#ec4899',
      icon: '🔬'
    },
    {
      id: 5,
      name: 'Communication Systems Lab',
      description: 'Advanced laboratory for wireless communication, antenna testing, RF design, and network protocol analysis.',
      shortDescription: 'Wireless & RF Systems',
      image: 'assets/images/labs/communication-lab.jpg',
      capacity: 28,
      features: [
        'RF Test Equipment',
        'Antenna Chambers',
        'Network Analyzers',
        'Software Defined Radio',
        'Protocol Analyzers'
      ],
      equipment: [
        'Vector Analyzers',
        'Antennas',
        'RF Generators',
        'SDR Platforms',
        'Spectrum Analyzers'
      ],
      supervisor: 'Dr. Ayesha Siddique',
      location: 'EE-Lab-05, Second Floor',
      color: '#10b981',
      icon: '📡'
    },
    {
      id: 6,
      name: 'Control Systems Lab',
      description: 'Comprehensive facility for control theory implementation, robotics, automation systems, and PLC programming.',
      shortDescription: 'Automation & Robotics',
      image: 'assets/images/labs/control-lab.jpg',
      capacity: 24,
      features: [
        'Robotic Arms',
        'PLC Systems',
        'SCADA Software',
        'Servo Motors',
        'Control Panels'
      ],
      equipment: [
        'Industrial Robots',
        'PLCs',
        'HMI Panels',
        'Sensors',
        'Actuators'
      ],
      supervisor: 'Engr. Omar Farooq',
      location: 'EE-Lab-06, Ground Floor',
      color: '#f97316',
      icon: '🤖'
    }
  ];

  openLabDetails(lab: Laboratory) {
    // Implementation for opening lab details modal or navigation
    console.log('Opening details for:', lab.name);
  }
}