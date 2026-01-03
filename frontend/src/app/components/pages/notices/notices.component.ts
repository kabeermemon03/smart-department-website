import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../services/firebase.service';

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
  eventName?: string;
  description?: string;
  link?: string;
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
  userRole: 'teacher' | 'student' | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Check authentication state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Determine role based on email
        if (user.email === 'teacher@esmuet.edu.pk') {
          this.userRole = 'teacher';
        } else if (user.email === 'student@esmuet.edu.pk') {
          this.userRole = 'student';
        }
      } else {
        this.userRole = null;
      }
    });

    this.loadNotices();
    this.initializeTabs();
  }

  async loadNotices() {
    try {
      const noticesCollection = collection(db, 'notices');
      const noticesSnapshot = await getDocs(noticesCollection);
      const noticesData: Notice[] = noticesSnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      } as Notice));

      this.notices = noticesData;
      this.featuredNotice = this.notices.find(notice => notice.featured) || null;
      this.filteredNotices = this.notices.filter(notice => !notice.featured);
      this.sortNoticesByDate();
    } catch (error) {
      console.error('Error loading notices:', error);
      // Fallback to empty array if Firebase fails
      this.notices = [];
      this.filteredNotices = [];
      this.featuredNotice = null;
    }
  }

  initializeTabs() {
    // Add event listeners for tab buttons - only in browser
    if (isPlatformBrowser(this.platformId)) {
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
    // Check if notice has a link and user is teacher, then open it
    if (notice.link && this.userRole === 'teacher') {
      window.open(notice.link, '_blank');
    } else if (notice.link && this.userRole !== 'teacher') {
      alert('This link is only accessible to teachers.');
    } else {
      // In future, this will open a modal or navigate to detail page
      console.log('Opening notice:', notice.title);
      alert(`Opening: ${notice.title}\n\n${notice.content || notice.excerpt}`);
    }
  }

  downloadAttachment(notice: Notice) {
    // In future, this will download the actual file
    console.log('Downloading attachment for:', notice.title);
    alert(`Downloading attachment for: ${notice.title}`);
  }
}