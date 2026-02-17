import { Component, ElementRef, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ChatService } from '../../services/chat';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('chatBox') chatBox!: ElementRef;

  userInput: string = '';
  messages: { sender: string; text: string; time: Date }[] = [];
  isLoading: boolean = false;
  emotionsUsed: boolean = false;
  showEmergencyPrompt: boolean = false;

  crisisKeywords = [
    'suicide',
    'kill myself',
    'end my life',
    'hurt myself',
    'kms',
    "don't want to live",
    'self harm'
  ];

  emotions = [
    { emoji: '😊', text: 'Happy' },
    { emoji: '😔', text: 'Sad' },
    { emoji: '😰', text: 'Anxious' },
    { emoji: '😴', text: 'Tired' },
    { emoji: '😡', text: 'Stressed' }
  ];

  conversationHistory: { role: string; content: string }[] = [];

  constructor(
    private chatService: ChatService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initializeSystemPrompt();
    this.loadConversation();
  }

  // ================================
  // INITIAL SYSTEM PROMPT
  // ================================
  initializeSystemPrompt() {
    this.conversationHistory = [
      {
        role: 'system',
        content: 'You are SadChad, the bro who actually listens and occasionally drops life advice. Keep it chill, empathetic, and real. Respond in a text-chat style like a friend who genuinely cares, not a formal therapist. Use short sentences, casual tone, and occasional humor or relatable Gen Z expressions. Your goal is to make the user feel heard, supported, and understood. When the user shares their feelings, acknowledge them, validate them, and offer simple, practical advice or coping tips. You can suggest things like breathing exercises, journaling prompts, mindfulness techniques, or small life hacks. Always sound like a caring bro, not a professional. Keep responses under 3–5 sentences, easy to read, and conversational.'
      }
    ];
  }

  // ================================
  // LOAD FROM LOCAL STORAGE
  // ================================
  loadConversation() {
    const savedMessages = localStorage.getItem('appChatMessages');
    const savedHistory = localStorage.getItem('conversationHistory');

    if (savedMessages) {
      const parsed = JSON.parse(savedMessages);
      this.messages = parsed.map((msg: any) => ({
        sender: msg.sender,
        text: msg.text,
        time: new Date(msg.time)
      }));
      this.emotionsUsed = this.messages.length > 0;
    }

    if (savedHistory) {
      this.conversationHistory = JSON.parse(savedHistory);
    }
  }

  // ================================
  // SAVE TO LOCAL STORAGE
  // ================================
  saveConversation() {
    localStorage.setItem('appChatMessages', JSON.stringify(this.messages));
    localStorage.setItem('conversationHistory', JSON.stringify(this.conversationHistory));
  }

  // ================================
  // 🔥 START NEW CHAT
  // ================================
  startNewChat() {

    // Clear UI messages
    this.messages = [];

    // Reset conversation history to only system prompt
    this.initializeSystemPrompt();

    // Reset UI states
    this.emotionsUsed = false;
    this.showEmergencyPrompt = false;
    this.isLoading = false;

    // Clear local storage
    localStorage.removeItem('appChatMessages');
    localStorage.removeItem('conversationHistory');

    // Force UI update
    this.cdr.detectChanges();
  }

  // ================================
  // SEND MESSAGE
  // ================================
  sendMessage() {
    if (!this.userInput.trim() || this.isLoading) return;

    const messageToSend = this.userInput;
    const lowerInput = messageToSend.toLowerCase();

    const isCrisis = this.crisisKeywords.some(keyword =>
      lowerInput.includes(keyword)
    );

    if (isCrisis) {
      this.showEmergencyPrompt = true;
    }

    this.userInput = '';
    this.isLoading = true;

    this.messages.push({
      sender: 'You',
      text: messageToSend,
      time: new Date()
    });

    this.scrollToBottom();

    this.conversationHistory.push({
      role: 'user',
      content: messageToSend
    });

    this.saveConversation();

    this.chatService.sendConversation(this.conversationHistory)
      .subscribe({
        next: (response) => {
          this.conversationHistory.push({
            role: 'assistant',
            content: response.reply
          });

          this.typeAIMessage(response.reply);
        },
        error: () => {
          this.isLoading = false;

          this.messages.push({
            sender: 'AI',
            text: 'Server error. Please try again.',
            time: new Date()
          });

          this.saveConversation();
        }
      });
  }

  // ================================
  // TYPING EFFECT
  // ================================
  typeAIMessage(fullText: string) {

  if (!fullText) {
    this.isLoading = false;
    return;
  }

  let index = 0;
  let currentText = '';

  const messageObj = {
    sender: 'AI',
    text: '',
    time: new Date()
  };

  this.messages.push(messageObj);
  this.cdr.detectChanges();

  const interval = setInterval(() => {

    if (index < fullText.length) {

      currentText += fullText.charAt(index);
      messageObj.text = currentText;
      index++;

      this.cdr.detectChanges();

    } else {

      clearInterval(interval);
      this.isLoading = false;
      this.saveConversation();
      this.cdr.detectChanges();

    }

  }, 15);
}

  scrollToBottom() {
    setTimeout(() => {
      if (this.chatBox) {
        this.chatBox.nativeElement.scrollTop =
          this.chatBox.nativeElement.scrollHeight;
      }
    }, 50);
  }

  sendEmotion(emotion: string) {
    this.userInput = `I am feeling ${emotion.toLowerCase()} today`;
    this.emotionsUsed = true;
    this.sendMessage();
  }
}
