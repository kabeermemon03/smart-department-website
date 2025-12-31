import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../../services/firebase.service';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  isLoggedIn = false;
  userRole: 'teacher' | 'student' | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  loginForm = {
    username: '',
    password: ''
  };

  // Teacher credentials
  private readonly TEACHER_EMAIL = 'teacher@esmuet.edu.pk';
  private readonly TEACHER_PASSWORD = 'esmuet1972';

  // Student credentials
  private readonly STUDENT_EMAIL = 'student@esmuet.edu.pk';
  private readonly STUDENT_PASSWORD = 'newsadmin2024';
  notices: any[] = [];
  noticeForm = {
    title: '',
    excerpt: '',
    content: '',
    category: 'news' as 'news' | 'announcements' | 'events' | 'academic',
    urgent: false,
    featured: false,
    downloadUrl: '',
    eventName: '',
    description: '',
    link: '',
    details: {
      venue: '',
      time: '',
      deadline: ''
    }
  };

  uploadForm = {
    semester: '',
    course: '',
    title: '',
    file: null as File | null
  };

  uploadedResults: any[] = [];

  ngOnInit() {
    // Check if user is already logged in with Firebase Auth
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
        // Determine role based on email
        if (user.email === this.TEACHER_EMAIL) {
          this.userRole = 'teacher';
        } else if (user.email === this.STUDENT_EMAIL) {
          this.userRole = 'student';
        }
        this.loadNotices();
      } else {
        this.isLoggedIn = false;
        this.userRole = null;
      }
    });
  }

  async login() {
    try {
      // Use Firebase Auth to sign in with the provided credentials
      const userCredential = await signInWithEmailAndPassword(auth, this.loginForm.username, this.loginForm.password);

      // Determine role based on email
      let role: 'teacher' | 'student';
      if (userCredential.user.email === this.TEACHER_EMAIL) {
        role = 'teacher';
      } else if (userCredential.user.email === this.STUDENT_EMAIL) {
        role = 'student';
      } else {
        // If email doesn't match expected users, sign out and show error
        await signOut(auth);
        alert('Unauthorized user. Please use valid admin credentials.');
        return;
      }

      this.isLoggedIn = true;
      this.userRole = role;
      this.loadNotices();
      alert(`Login successful! Welcome ${role} admin.`);
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'Login failed. Please check your credentials.';

      // Provide more specific error messages
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'User not found. Please check your email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format.';
      }

      alert(errorMessage);
    }
  }

  async logout() {
    try {
      await signOut(auth);
      this.isLoggedIn = false;
      this.userRole = null;
      this.loginForm = { username: '', password: '' };
      this.notices = [];
      alert('Logged out successfully!');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Error logging out. Please try again.');
    }
  }

  // Permission methods
  canManageResults(): boolean {
    return this.userRole === 'teacher';
  }

  canManageNews(): boolean {
    return this.userRole === 'teacher' || this.userRole === 'student';
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.uploadForm.file = file;
    } else {
      alert('Please select a PDF file');
    }
  }

  uploadResult() {
    // TODO: Implement secure backend upload and storage (S3/Cloud Storage) with auth.
    alert('Upload functionality not implemented yet.');
  }

  deleteResult(id: number) {
    if (confirm('Are you sure you want to delete this result?')) {
      // TODO: call backend to delete
      this.uploadedResults = this.uploadedResults.filter(result => result.id !== id);
      this.saveToLocalStorage();
    }
  }

  // News Admin Methods
  async loadNotices() {
    try {
      const noticesCollection = collection(db, 'notices');
      const noticesSnapshot = await getDocs(noticesCollection);
      this.notices = noticesSnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error loading notices:', error);
    }
  }

  async addNotice() {
    if (!this.noticeForm.title || !this.noticeForm.excerpt) {
      alert('Please fill in title and excerpt.');
      return;
    }

    try {
      const noticeData = {
        ...this.noticeForm,
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      };

      await addDoc(collection(db, 'notices'), noticeData);
      this.resetNoticeForm();
      this.loadNotices();
      alert('Notice added successfully!');
    } catch (error) {
      console.error('Error adding notice:', error);
      alert('Failed to add notice.');
    }
  }

  async updateNotice(notice: any) {
    try {
      const noticeRef = doc(db, 'notices', notice.id);
      await updateDoc(noticeRef, {
        title: notice.title,
        excerpt: notice.excerpt,
        content: notice.content,
        category: notice.category,
        urgent: notice.urgent,
        featured: notice.featured,
        downloadUrl: notice.downloadUrl,
        eventName: notice.eventName,
        description: notice.description,
        link: notice.link,
        details: notice.details
      });
      this.loadNotices();
      alert('Notice updated successfully!');
    } catch (error) {
      console.error('Error updating notice:', error);
      alert('Failed to update notice.');
    }
  }

  async deleteNotice(id: string) {
    if (confirm('Are you sure you want to delete this notice?')) {
      try {
        await deleteDoc(doc(db, 'notices', id));
        this.loadNotices();
        alert('Notice deleted successfully!');
      } catch (error) {
        console.error('Error deleting notice:', error);
        alert('Failed to delete notice.');
      }
    }
  }

  resetNoticeForm() {
    this.noticeForm = {
      title: '',
      excerpt: '',
      content: '',
      category: 'news',
      urgent: false,
      featured: false,
      downloadUrl: '',
      eventName: '',
      description: '',
      link: '',
      details: {
        venue: '',
        time: '',
        deadline: ''
      }
    };
  }

  resetUploadForm() {
    this.uploadForm = {
      semester: '',
      course: '',
      title: '',
      file: null
    };
  }

  loadResults() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('uploadedResults');
      if (saved) {
        this.uploadedResults = JSON.parse(saved);
      }
    }
  }

  saveToLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('uploadedResults', JSON.stringify(this.uploadedResults));
    }
  }
}