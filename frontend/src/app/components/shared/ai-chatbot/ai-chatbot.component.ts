import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatGPTService } from '../../../services/chatgpt.service';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  actions?: ChatAction[];
}

interface ChatAction {
  label: string;
  action: string;
  data?: any;
}

@Component({
  selector: 'app-ai-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-chatbot.component.html',
  styleUrl: './ai-chatbot.component.css'
})
export class AiChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  
  isOpen = false;
  isOnline = true;
  isTyping = false;
  hasNewMessage = false;
  currentMessage = '';
  messages: ChatMessage[] = [];
  useAI = false; // Set to true to use ChatGPT API, false for predefined responses

  constructor(private chatGPTService: ChatGPTService) {}

  // Sample responses for demo
  botResponses: { [key: string]: string } = {
    'tell me about the department': 'The Electronics Engineering Department at MUET is dedicated to providing world-class education in electronics engineering. We offer undergraduate and graduate programs with state-of-the-art facilities and experienced faculty.',
    'show me academic programs': 'We offer three main programs:\n• Bachelor of Electronics Engineering (4 years)\n• Master of Electronics Engineering (2 years)\n• PhD in Electronics Engineering (3-5 years)\n\nEach program is designed to meet industry standards and prepare students for successful careers.',
    'faculty information': 'Our department has 25+ experienced faculty members including professors, associate professors, and lecturers. All faculty members hold advanced degrees and have extensive research experience in their respective fields.',
    'admission requirements': 'For undergraduate admission:\n• Intermediate with Physics, Chemistry, and Mathematics\n• Entry test score\n• Merit-based selection\n\nFor graduate programs:\n• Relevant bachelor\'s degree\n• CGPA requirements\n• Research proposal (for PhD)',
    'default': 'I\'m here to help you with information about the Electronics Engineering Department. You can ask me about:\n• Academic programs\n• Faculty information\n• Admission requirements\n• Department facilities\n• Research opportunities'
  };

  ngOnInit() {
    // Simulate initial bot message after a delay
    setTimeout(() => {
      if (!this.isOpen) {
        this.hasNewMessage = true;
      }
    }, 3000);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.hasNewMessage = false;
    }
  }

  sendMessage() {
    if (!this.currentMessage.trim() || this.isTyping) return;

    const userMessage: ChatMessage = {
      id: this.generateId(),
      text: this.currentMessage,
      sender: 'user',
      timestamp: new Date()
    };

    this.messages.push(userMessage);
    const messageText = this.currentMessage;
    this.currentMessage = '';

    // Simulate bot typing
    this.isTyping = true;
    
    if (this.useAI) {
      // Use ChatGPT API
      const conversationHistory = this.chatGPTService.getConversationContext(this.messages.slice(0, -1));
      
      this.chatGPTService.sendMessage(messageText, conversationHistory)
        .subscribe({
          next: (response: string) => {
            this.isTyping = false;
            const botMessage: ChatMessage = {
              id: this.generateId(),
              text: response,
              sender: 'bot',
              timestamp: new Date(),
              actions: this.getBotActions(messageText.toLowerCase())
            };
            this.messages.push(botMessage);
          },
          error: (error: Error) => {
            this.isTyping = false;
            const errorMessage: ChatMessage = {
              id: this.generateId(),
              text: error.message || 'Sorry, I encountered an error. Please try again.',
              sender: 'bot',
              timestamp: new Date()
            };
            this.messages.push(errorMessage);
          }
        });
    } else {
      // Use predefined responses (fallback)
      setTimeout(() => {
        this.isTyping = false;
        const botResponse = this.getBotResponse(messageText.toLowerCase());
        
        const botMessage: ChatMessage = {
          id: this.generateId(),
          text: botResponse,
          sender: 'bot',
          timestamp: new Date(),
          actions: this.getBotActions(messageText.toLowerCase())
        };

        this.messages.push(botMessage);
      }, 1000 + Math.random() * 2000);
    }
  }

  sendQuickMessage(message: string) {
    this.currentMessage = message;
    this.sendMessage();
  }

  getBotResponse(message: string): string {
    // Simple keyword matching for demo
    for (const key in this.botResponses) {
      if (message.includes(key)) {
        return this.botResponses[key];
      }
    }
    
    // Check for common greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! Welcome to the Electronics Engineering Department. How can I assist you today?';
    }
    
    // Check for thanks
    if (message.includes('thank') || message.includes('thanks')) {
      return 'You\'re welcome! Is there anything else you\'d like to know about our department?';
    }
    
    // Check for contact info
    if (message.includes('contact') || message.includes('phone') || message.includes('email')) {
      return 'You can contact us at:\n📧 electronics@admin.muet.edu.pk\n📞 +92-22-2771781\n📍 MUET, Jamshoro, Sindh, Pakistan';
    }
    
    // Check for results
    if (message.includes('result') || message.includes('exam')) {
      return 'You can check examination results in the Results section of our website. Results are updated regularly after each examination period.';
    }
    
    // Check for labs
    if (message.includes('lab') || message.includes('laboratory')) {
      return 'Our department has state-of-the-art laboratories including:\n• Electronics & Communication Lab\n• Power Electronics Lab\n• Digital Systems Lab\n• VLSI Design Lab';
    }
    
    return this.botResponses['default'];
  }

  getBotActions(message: string): ChatAction[] | undefined {
    if (message.includes('program') || message.includes('academic')) {
      return [
        { label: 'View Academic Programs', action: 'navigate', data: '/academics' },
        { label: 'Download Brochure', action: 'download', data: 'brochure.pdf' }
      ];
    }
    
    if (message.includes('faculty')) {
      return [
        { label: 'Meet Our Faculty', action: 'navigate', data: '/faculty' }
      ];
    }
    
    if (message.includes('contact')) {
      return [
        { label: 'Contact Us', action: 'navigate', data: '/contact' }
      ];
    }
    
    return undefined;
  }

  handleAction(action: ChatAction) {
    switch (action.action) {
      case 'navigate':
        // In a real app, you would use Router here
        window.location.href = action.data;
        break;
      case 'download':
        // Handle file download
        console.log('Downloading:', action.data);
        break;
      default:
        console.log('Unknown action:', action);
    }
  }

  private scrollToBottom() {
    if (this.messagesContainer) {
      const element = this.messagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }

  formatMessage(text: string): string {
    return text.replace(/\n/g, '<br>');
  }

  formatTime(timestamp: Date): string {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
