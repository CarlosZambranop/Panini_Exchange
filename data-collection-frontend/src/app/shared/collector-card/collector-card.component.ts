import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import {
  CollectorResponse,
  CollectorLevel,
  getCollectorLevel,
  getLevelColor
} from '../../models/user-data.model';

@Component({
  selector: 'app-collector-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatRippleModule],
  templateUrl: './collector-card.component.html',
  styleUrls: ['./collector-card.component.css']
})
export class CollectorCardComponent {
  @Input({ required: true }) collector!: CollectorResponse;

  get level(): CollectorLevel {
    return getCollectorLevel(this.collector.stickerCount);
  }

  get levelColor(): string {
    return getLevelColor(this.level);
  }

  get levelIcon(): string {
    switch (this.level) {
      case 'Principiante':  return 'emoji_events';
      case 'Coleccionista': return 'star';
      case 'Experto':       return 'workspace_premium';
    }
  }

  onProposeExchange(): void {
    // UI-only: future feature — will open a contact dialog
    alert(`Propuesta de intercambio enviada a ${this.collector.displayName}!`);
  }
}
