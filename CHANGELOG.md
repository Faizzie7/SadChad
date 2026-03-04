# Changelog

All notable changes to this project will be documented in this file.

This project follows a simple changelog format to track improvements and updates.

---

## [1.0.0] - Initial Release

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