# Changelog

All notable changes to this project will be documented in this file.

This project follows a simple changelog format to track improvements and updates.

---

## v1.1.1 – 2026-03-05

###  Remote Demo Deployment

### Added
- Cloudflare Tunnel support for external access
- Express combined host server (host.js)

### Changed
- Frontend API URL switched from localhost:3000 → /api/chat

### Fixed
- Background video playback on refresh
- Chat send/receive sound effects
- Angular production build hosting

### Improvements
- Chatbot accessible from any internet device
- Single public demo URL

---

## [1.1.0] - 2026-03-04

### Added
- Full-screen **video background for chat interface**
- **Send and receive sound effects** for chat messages
- **Audio unlock system** to bypass browser autoplay restrictions
- **Video autoplay recovery system** to resume playback after refresh
- **Dynamic SadChad header redesign** with title and subtitle
- **Responsive full-height chat layout** for desktop and mobile

### Improved
- Chat UI now fills **100% of viewport height**
- Improved **background overlay and blur styling**
- Enhanced **message bubble gradients and animations**
- Improved **scroll-to-bottom behavior** for new messages
- Better **mobile responsiveness**

### Fixed
- Background video **not playing after refresh**
- Video **not appearing behind chat container**
- Chat container **not filling full page height**
- **Audio playback blocked by browser autoplay policy**
- **Receive sound not triggering after AI response**
- **Send sound not triggering on message send**

### Technical
- Added `AfterViewInit` lifecycle hook for media initialization
- Implemented `ensureVideoPlaying()` logic for video recovery
- Added `unlockAudio()` workaround for browser audio restrictions
- Improved Angular component structure with `ViewChild` references
- Added background video management inside chat component

---

## [1.0.0] - Initial Release - 2026-02-17

### Added

#### Core Application
- Initial release of **SadChad — Your bro who actually listens and occasionally gives life advice**
- Full-stack AI chat application built using Angular and Node.js
- Integration with AI API for generating empathetic conversational responses
- Custom personality prompt system for SadChad conversational tone

#### Frontend (Angular)
- Chat interface with modern responsive UI
- Real-time chat message rendering
- Typing indicator animation (three-dot loader)
- Message timestamp display
- User and AI message styling
- Emotion quick-select buttons for faster conversation starters
  - Happy
  - Sad
  - Anxious
  - Tired
  - Stressed

#### Chat Features
- Conversation history tracking
- AI responses generated based on conversation context
- Message formatting support including:
  - Bold text formatting
  - Line breaks
  - Structured responses
- Typewriter-style AI message animation

#### Local Storage System
- Persistent chat history stored using browser `localStorage`
- Automatic conversation reload on page refresh
- Conversation state recovery on reload
- "New Chat" button to reset conversation state
- Local storage cleanup for chat reset

#### Backend (Node.js + Express)
- Express server for handling chat requests
- REST API endpoint `/chat`
- AI request forwarding to Groq/OpenAI compatible API
- JSON response handling
- CORS enabled for frontend communication
- Environment variable support for API keys

#### Safety Features
- Crisis keyword detection system
- Detection of sensitive phrases such as:
  - suicide
  - kill myself
  - self harm
  - kms
- Emergency support prompt system
- Dedicated emergency support page

#### Application Structure
- Modular Angular component structure
- Separation of frontend and backend directories
- Service-based API communication layer
- Organized routing for application pages

#### UI Components
- Chat component
- Emergency support page
- Therapist directory page
- Emotion selection bar
- Chat header with new chat control

#### Development Tools
- Angular CLI project setup
- Node.js backend environment
- dotenv configuration for environment variables
- Git repository initialization

#### Documentation
- Project README with setup instructions
- Project documentation for academic submission
- GitHub repository structure
- Initial CHANGELOG for version tracking

---

### Technical Stack

Frontend
- Angular
- TypeScript
- HTML / CSS

Backend
- Node.js
- Express.js

AI Integration
- OpenAI-compatible API via Groq

Storage
- Browser localStorage

Development
- Node Package Manager (npm)
- Angular CLI
- Git version control

---

### Known Limitations

- Chat history stored only locally in browser
- No user authentication system
- Crisis detection based on simple keyword matching
- Requires internet connection for AI responses
- Not intended to replace professional mental health services

---

### Notes

This version represents the **first working prototype** of SadChad developed as part of a **Bachelor of Computer Applications (BCA) final year project**.

Future updates may include authentication, database integration, improved crisis detection, voice interaction, and deployment to cloud infrastructure.