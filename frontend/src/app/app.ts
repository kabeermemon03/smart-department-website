import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { AiChatbotComponent } from './components/shared/ai-chatbot/ai-chatbot.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AiChatbotComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title() {
    return 'Smart Department';
  }
}