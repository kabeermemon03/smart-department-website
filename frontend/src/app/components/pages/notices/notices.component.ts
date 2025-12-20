import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Notice {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'news' | 'announcements' | 'events' | 'academic';
  date: string;
  urgent: boolean;
  featured: boolean;
  downloadUrl?: string;
  details?: {
    venue?: string;
    time?: string;
    deadline?: string;
  };
}

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notices.component.html',
  styleUrl: './notices.component.css'
})
export class NoticesComponent implements OnInit {
  notices: Notice[] = [];
  filteredNotices: Notice[] = [];
  featuredNotice: Notice | null = null;
  selectedCategory: string = 'all';

  // Sample data
  sampleNotices: Notice[] = [
    {
      id: '1',
      title: 'New Electronics Lab Equipment Installation',
      excerpt: 'State-of-the-art equipment has been installed in the Electronics Lab to enhance practical learning experience.',
      content: 'Full content here...',
      category: 'news',
      date: '2024-01-15',
      urgent: false,
      featured: true,
      details: {
        venue: 'Electronics Lab - Room 101'
      }
    },
    {
      id: '2',
      title: 'Final Examination Schedule - Spring 2024',
      excerpt: 'The final examination schedule for Spring 2024 semester has been announced. Please check your exam dates.',
      content: 'Full content here...',
      category: 'academic',
      date: '2024-01-10',
      urgent: true,
      featured: false,
      downloadUrl: '#',
      details: {
        deadline: '2024-02-15'
      }
    },
    {
      id: '3',
      title: 'IEEE Student Chapter Workshop',
      excerpt: 'Join us for an exciting workshop on "Future of Electronics Engineering" organized by IEEE Student Chapter.',
      content: 'Full content here...',
      category: 'events',
      date: '2024-01-08',
      urgent: false,
      featured: false,
      details: {
        venue: 'Main Auditorium',
        time: '2:00 PM - 5:00 PM'
      }
    },
    {
      id: '4',
      title: 'Scholarship Applications Open',
      excerpt: 'Merit-based scholarships are now available for outstanding students. Apply before the deadline.',
      content: 'Full content here...',
      category: 'announcements',
      date: '2024-01-05',
      urgent: true,
      featured: false,
      details: {
        deadline: '2024-01-30'
      }
    },
    {
      id: '5',
      title: 'Research Paper Publication Success',
      excerpt: 'Our faculty members have published groundbreaking research in international journals.',
      content: 'Full content here...',
      category: 'news',
      date: '2024-01-03',
      urgent: false,
      featured: false
    },
    {
      id: '6',
      title: 'Industrial Visit to Tech Company',
      excerpt: 'Students will visit leading technology companies to gain practical industry exposure.',
      content: 'Full content here...',
      category: 'events',
      date: '2024-01-01',
      urgent: false,
      featured: false,
      details: {
        venue: 'Tech Park, Karachi',
        time: '9:00 AM - 4:00 PM'
      }
    }
  ];

  ngOnInit() {
    this.loadNotices();
    this.initializeTabs();
  }

  loadNotices() {
    this.notices = this.sampleNotices;
    this.featuredNotice = this.notices.find(notice => notice.featured) || null;
    this.filteredNotices = this.notices.filter(notice => !notice.featured);
    this.sortNoticesByDate();
  }

  initializeTabs() {
    // Add event listeners for tab buttons
    setTimeout(() => {
      const tabButtons = document.querySelectorAll('.tab-btn');
      tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          const category = target.getAttribute('data-category') || 'all';
          
          // Remove active class from all buttons
          tabButtons.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          target.classList.add('active');
          
          // Filter notices
          this.selectedCategory = category;
          this.filterNotices();
        });
      });
    }, 100);
  }

  filterNotices() {
    if (this.selectedCategory === 'all') {
      this.filteredNotices = this.notices.filter(notice => !notice.featured);
    } else {
      this.filteredNotices = this.notices.filter(notice => 
        notice.category === this.selectedCategory && !notice.featured
      );
    }
    this.sortNoticesByDate();
  }

  sortNoticesByDate() {
    this.filteredNotices.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  getCategoryLabel(category: string): string {
    switch(category) {
      case 'news': return 'News';
      case 'announcements': return 'Announcement';
      case 'events': return 'Event';
      case 'academic': return 'Academic';
      default: return category;
    }
  }

  getCategoryClass(category: string): string {
    return `category-${category}`;
  }

  openNotice(notice: Notice) {
    // In future, this will open a modal or navigate to detail page
    console.log('Opening notice:', notice.title);
    alert(`Opening: ${notice.title}\n\n${notice.content || notice.excerpt}`);
  }

  downloadAttachment(notice: Notice) {
    // In future, this will download the actual file
    console.log('Downloading attachment for:', notice.title);
    alert(`Downloading attachment for: ${notice.title}`);
  }
}