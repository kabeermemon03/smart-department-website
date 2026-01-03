import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from './firebase.service';

export interface NewsItem {
  id?: string;
  title: string;
  excerpt: string;
  content?: string;
  category: 'news' | 'announcements' | 'events' | 'academic';
  urgent: boolean;
  featured: boolean;
  imageUrl?: string;
  downloadUrl?: string;
  eventName?: string;
  description?: string;
  link?: string;
  date: string;
  createdAt: string;
  details?: {
    venue?: string;
    time?: string;
    deadline?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private storage = getStorage();

  constructor() {}

  // Upload image to Firebase Storage
  async uploadImage(file: File, folder: string = 'news'): Promise<string> {
    try {
      const timestamp = Date.now();
      const fileName = `${folder}/${timestamp}_${file.name}`;
      const storageRef = ref(this.storage, fileName);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  }

  // Delete image from Firebase Storage
  async deleteImage(imageUrl: string): Promise<void> {
    try {
      const imageRef = ref(this.storage, imageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.error('Error deleting image:', error);
      // Don't throw error if image doesn't exist
    }
  }

  // Add news item to Firestore
  async addNews(newsData: Omit<NewsItem, 'id' | 'createdAt'>): Promise<string> {
    try {
      const newsItem: Omit<NewsItem, 'id'> = {
        ...newsData,
        createdAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'news'), newsItem);
      return docRef.id;
    } catch (error) {
      console.error('Error adding news:', error);
      throw new Error('Failed to add news item');
    }
  }

  // Get all news items
  async getAllNews(): Promise<NewsItem[]> {
    try {
      const newsQuery = query(
        collection(db, 'news'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(newsQuery);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as NewsItem));
    } catch (error) {
      console.error('Error fetching news:', error);
      throw new Error('Failed to fetch news items');
    }
  }

  // Update news item
  async updateNews(id: string, newsData: Partial<NewsItem>): Promise<void> {
    try {
      const newsRef = doc(db, 'news', id);
      await updateDoc(newsRef, newsData);
    } catch (error) {
      console.error('Error updating news:', error);
      throw new Error('Failed to update news item');
    }
  }

  // Delete news item
  async deleteNews(id: string, imageUrl?: string): Promise<void> {
    try {
      // Delete image if exists
      if (imageUrl) {
        await this.deleteImage(imageUrl);
      }

      // Delete document from Firestore
      await deleteDoc(doc(db, 'news', id));
    } catch (error) {
      console.error('Error deleting news:', error);
      throw new Error('Failed to delete news item');
    }
  }

  // Get news by category
  async getNewsByCategory(category: string): Promise<NewsItem[]> {
    try {
      const newsQuery = query(
        collection(db, 'news'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(newsQuery);
      
      const allNews = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as NewsItem));

      return allNews.filter(news => news.category === category);
    } catch (error) {
      console.error('Error fetching news by category:', error);
      throw new Error('Failed to fetch news by category');
    }
  }

  // Get featured news
  async getFeaturedNews(): Promise<NewsItem[]> {
    try {
      const newsQuery = query(
        collection(db, 'news'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(newsQuery);
      
      const allNews = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as NewsItem));

      return allNews.filter(news => news.featured);
    } catch (error) {
      console.error('Error fetching featured news:', error);
      throw new Error('Failed to fetch featured news');
    }
  }

  // Get urgent news
  async getUrgentNews(): Promise<NewsItem[]> {
    try {
      const newsQuery = query(
        collection(db, 'news'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(newsQuery);
      
      const allNews = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as NewsItem));

      return allNews.filter(news => news.urgent);
    } catch (error) {
      console.error('Error fetching urgent news:', error);
      throw new Error('Failed to fetch urgent news');
    }
  }
}