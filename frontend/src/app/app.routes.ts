import { Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat';
import { TherapistDirectory } from './components/therapist-directory/therapist-directory';
import { EmergencyComponent } from './components/emergency/emergency';

export const routes: Routes = [
  { path: '', component: ChatComponent },
  { path: 'therapists', component: TherapistDirectory },
  { path: 'emergency', component: EmergencyComponent },

  // Optional: redirect unknown routes to home
  { path: '**', redirectTo: '' }
];