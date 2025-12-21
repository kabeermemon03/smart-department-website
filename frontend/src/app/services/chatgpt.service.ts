import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface ChatGPTMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatGPTResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ChatGPTService {
  // Frontend should never ship API keys. Backend proxy expected at '/api/chat'.
  private readonly API_URL = '/api/chat';
  private readonly API_KEY = ''; // Intentionally left empty — configure server-side when backend is added
  
  // System prompt for the Electronics Engineering Department context
  private readonly SYSTEM_PROMPT = `You are ES AI Assistant, a helpful chatbot for the Electronics Engineering Department at MUET (Mehran University of Engineering and Technology). 

Your knowledge includes:
- Department information: Established in 1995, 25+ faculty members, 500+ students, 12 laboratories
- Academic programs: Bachelor's, Master's, and PhD in Electronics Engineering
- Faculty specializations: Power Electronics, Digital Signal Processing, VLSI Design, Communication Systems, Control Systems, Renewable Energy
- Laboratories: Electronics & Communication Lab, Power Electronics Lab, Digital Systems Lab, VLSI Design Lab, Communication Systems Lab, Control Systems Lab
- Admission requirements and procedures
- Research opportunities and projects
- Contact information and locations

Always be helpful, professional, and provide accurate information about the department. If you don't know something specific, direct users to contact the department directly.`;

  constructor(private http: HttpClient) {}

  sendMessage(userMessage: string, conversationHistory: ChatGPTMessage[] = []): Observable<string> {
    const messages: ChatGPTMessage[] = [
      { role: 'system', content: this.SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      messages: messages
      // backend is responsible for model selection and OpenAI credentials
    };

    return this.http.post<any>(this.API_URL, body, { headers })
      .pipe(
        map(response => {
          if (response?.content) return response.content;
          if (response?.choices?.[0]?.message?.content) return response.choices[0].message.content;
          return 'Sorry, I could not generate a response.';
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('ChatGPT API Error:', error);
    
    let errorMessage = 'Sorry, I\'m experiencing technical difficulties. Please try again later.';
    
    if (error.status === 401) {
      errorMessage = 'Authentication error. Please check the API configuration.';
    } else if (error.status === 429) {
      errorMessage = 'I\'m currently busy. Please wait a moment and try again.';
    } else if (error.status === 500) {
      errorMessage = 'Server error. Please try again in a few minutes.';
    }
    
    return throwError(() => new Error(errorMessage));
  }

  // Method to get conversation context for better responses
  getConversationContext(messages: any[]): ChatGPTMessage[] {
    return messages
      .slice(-10) // Keep last 10 messages for context
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.text
      }));
  }
}