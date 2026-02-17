import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-emergency',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './emergency.html',
  styleUrls: ['./emergency.css']
})
export class EmergencyComponent {}
