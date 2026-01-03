import { Injectable } from '@angular/core';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase.service';

export interface Notice {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'news' | 'announcements' | 'events' | 'academic';
  date: string;
  urgent: boolean;
  featured: boolean;
  downloadUrl: string;
  eventName: string;
  description: string;
  link: string;
  details: {
    venue: string;
    time: string;
    deadline: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class NoticesService {

  constructor() { }

  async getNotices(): Promise<Notice[]> {
    try {
      const noticesCollection = collection(db, 'notices');
      const noticesSnapshot = await getDocs(noticesCollection);
      return noticesSnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      } as Notice));
    } catch (error) {
      console.error('Error fetching notices:', error);
      throw error;
    }
  }

  async addNotice(notice: Omit<Notice, 'id'>): Promise<void> {
    try {
      const noticeData = {
        ...notice,
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      };
      await addDoc(collection(db, 'notices'), noticeData);
    } catch (error) {
      console.error('Error adding notice:', error);
      throw error;
    }
  }

  async updateNotice(noticeId: string, notice: Partial<Notice>): Promise<void> {
    try {
      const noticeRef = doc(db, 'notices', noticeId);
      await updateDoc(noticeRef, notice);
    } catch (error) {
      console.error('Error updating notice:', error);
      throw error;
    }
  }

  async deleteNotice(noticeId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'notices', noticeId));
    } catch (error) {
      console.error('Error deleting notice:', error);
      throw error;
    }
  }

  async getLatestNotices(limitCount: number = 6): Promise<Notice[]> {
    try {
      const noticesRef = collection(db, 'notices');
      const q = query(noticesRef, orderBy('date', 'desc'), limit(limitCount));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Notice));
    } catch (error) {
      console.error('Error fetching latest notices:', error);
      throw error;
    }
  }
}
