import { Component, ElementRef, ViewChild, ChangeDetectorRef, OnInit, AfterViewInit } from '@angular/core';
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
export class ChatComponent implements OnInit, AfterViewInit {

  @ViewChild('chatBox') chatBox!: ElementRef;
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  // 🔊 SOUND SYSTEM
  private sendAudio = new Audio('/sounds/send.mp3');
  private receiveAudio = new Audio('/sounds/receive.mp3');
  private audioUnlocked = false;

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
  // VIDEO AUTO RESUME FIX
  // ================================

  ngAfterViewInit() {
    this.ensureVideoPlaying();

    setTimeout(() => this.ensureVideoPlaying(), 200);
    setTimeout(() => this.ensureVideoPlaying(), 800);

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.ensureVideoPlaying();
      }
    });
  }

  private ensureVideoPlaying() {
    try {
      const video = this.bgVideo?.nativeElement;
      if (!video) return;

      video.muted = true;
      video.playsInline = true;

      if (video.paused) {
        video.play().catch(() => {});
      }
    } catch {}
  }

  // ================================
  // 🔊 AUDIO HELPERS
  // ================================

  private unlockAudio() {
    if (this.audioUnlocked) return;
    this.audioUnlocked = true;

    const prime = (a: HTMLAudioElement) => {
      a.preload = 'auto';
      a.muted = true;
      a.play().then(() => {
        a.pause();
        a.currentTime = 0;
        a.muted = false;
      }).catch(() => {});
    };

    prime(this.sendAudio);
    prime(this.receiveAudio);
  }

  private playSendSound() {
    this.sendAudio.currentTime = 0;
    this.sendAudio.play().catch(() => {});
  }

  private playReceiveSound() {
    this.receiveAudio.currentTime = 0;
    this.receiveAudio.play().catch(() => {});
  }

  // ================================
  // INITIAL SYSTEM PROMPT
  // ================================

  initializeSystemPrompt() {
    this.conversationHistory = [
      {
        role: 'system',
        content:
          'You are SadChad, the bro who actually listens and occasionally drops life advice. Keep it chill, empathetic, and real. Respond in a text-chat style like a friend who genuinely cares.'
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
  // START NEW CHAT
  // ================================

  startNewChat() {

    this.messages = [];

    this.initializeSystemPrompt();

    this.emotionsUsed = false;
    this.showEmergencyPrompt = false;
    this.isLoading = false;

    localStorage.removeItem('appChatMessages');
    localStorage.removeItem('conversationHistory');

    this.cdr.detectChanges();
  }

  // ================================
  // SEND MESSAGE
  // ================================

  sendMessage() {
    if (!this.userInput.trim() || this.isLoading) return;

    // 🔊 play send sound
    this.unlockAudio();
    this.playSendSound();

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

        // 🔊 play receive sound
        this.playReceiveSound();

        this.saveConversation();
        this.cdr.detectChanges();
      }

    }, 15);
  }

  // ================================
  // SCROLL
  // ================================

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