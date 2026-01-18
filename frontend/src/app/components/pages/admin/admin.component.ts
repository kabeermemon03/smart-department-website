import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../../services/firebase.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  isLoggedIn = false;
  userRole: 'teacher' | 'student' | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastService: ToastService
  ) {}
  loginForm = {
    username: '',
    password: ''
  };


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
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.isLoggedIn = true;
        // Determine role based on Firestore users collection
        await this.determineUserRole(user.uid);
        this.loadNotices();
        this.loadResults(); // Load results when user is authenticated
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

      // Determine role based on Firestore users collection
      const role = await this.determineUserRole(userCredential.user.uid);

      if (!role) {
        // If user doesn't have admin role, sign out and show error
        await signOut(auth);
        this.toastService.error('Access Denied', 'You do not have admin privileges for this system.');
        return;
      }

      this.isLoggedIn = true;
      this.userRole = role;
      this.loadNotices();
      this.toastService.success('Login Successful', `Welcome ${role} admin! You now have access to the dashboard.`);
    } catch (error: any) {
      console.error('Login error:', error);
      let errorTitle = 'Login Failed';
      let errorMessage = 'Please check your credentials and try again.';

      // Provide more specific error messages
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }

      this.toastService.error(errorTitle, errorMessage);
    }
  }

  async logout() {
    try {
      await signOut(auth);
      this.isLoggedIn = false;
      this.userRole = null;
      this.loginForm = { username: '', password: '' };
      this.notices = [];
      this.toastService.success('Logged Out', 'You have been successfully logged out.');
    } catch (error) {
      console.error('Logout error:', error);
      this.toastService.error('Logout Error', 'There was an issue logging out. Please try again.');
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

  async uploadResult() {
    if (!this.uploadForm.file || !this.uploadForm.semester || !this.uploadForm.course) {
      this.toastService.error('Validation Error', 'Please select a PDF file, semester, and course.');
      return;
    }

    try {
      // Create a unique filename for the upload
      const timestamp = new Date().getTime();
      const fileName = `results/${this.uploadForm.semester}/${this.uploadForm.course}/${timestamp}-${this.uploadForm.file.name}`;
      
      // Upload file to Firebase Storage
      const storageRef = ref(storage, fileName);
      const snapshot = await uploadBytes(storageRef, this.uploadForm.file);
      
      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // Create result object
      const resultData = {
        id: timestamp.toString(),
        title: this.uploadForm.title || `${this.uploadForm.course} Results`,
        semester: this.uploadForm.semester,
        year: new Date().getFullYear().toString(),
        type: 'final' as 'midterm' | 'final' | 'supplementary',
        uploadDate: new Date().toISOString().split('T')[0],
        fileName: this.uploadForm.file.name,
        fileUrl: downloadURL,
        storagePath: fileName
      };

      // Save result metadata to Firestore
      await addDoc(collection(db, 'results'), resultData);
      
      // Update local list
      this.uploadedResults.push(resultData);
      this.saveToLocalStorage();
      
      this.resetUploadForm();
      this.toastService.success('Upload Successful', 'Result PDF has been uploaded and is now available for download.');
    } catch (error: any) {
      console.error('Upload error:', error);
      this.toastService.error('Upload Failed', 'Failed to upload PDF. Please try again.');
    }
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

  getCategoryIcon(category: string): string {
    switch(category) {
      case 'news': return '📰';
      case 'announcements': return '📢';
      case 'events': return '🎉';
      case 'academic': return '🎓';
      default: return '📄';
    }
  }

  // Determine user role from Firestore users collection
  private async determineUserRole(uid: string): Promise<'teacher' | 'student' | null> {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        return userData['role'] as 'teacher' | 'student';
      }

      // If user not found in Firestore, create default admin role based on email
      const user = auth.currentUser;
      if (user) {
        let role: 'teacher' | 'student' = 'teacher'; // Default to teacher
        
        // Determine role based on email domain or specific emails
        if (user.email?.includes('teacher') || user.email?.includes('admin') || user.email?.includes('faculty')) {
          role = 'teacher';
        } else if (user.email?.includes('student')) {
          role = 'student';
        }

        // Create user document in Firestore
        await addDoc(collection(db, 'users'), {
          uid: uid,
          email: user.email,
          role: role,
          createdAt: new Date().toISOString()
        });

        return role;
      }

      return null;
    } catch (error) {
      console.error('Error determining user role:', error);
      // Fallback: if there's an error, allow teacher access for admin emails
      const user = auth.currentUser;
      if (user?.email?.includes('admin') || user?.email?.includes('teacher') || user?.email?.includes('faculty')) {
        return 'teacher';
      }
      return null;
    }
  }
}
