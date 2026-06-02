import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { Sticker, RARITY_COLOR, RARITY_GRADIENT, RARITY_LABEL } from '../../models/sticker.model';

@Component({
  selector: 'app-sticker-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, MatRippleModule],
  templateUrl: './sticker-card.component.html',
  styleUrls: ['./sticker-card.component.css']
})
export class StickerCardComponent {
  @Input({ required: true }) sticker!: Sticker;
  @Input() isLoggedIn = false;
  @Output() tradeStickerClicked = new EventEmitter<Sticker>();

  readonly rarityColor    = RARITY_COLOR;
  readonly rarityGradient = RARITY_GRADIENT;
  readonly rarityLabel    = RARITY_LABEL;

  onTrade(): void {
    this.tradeStickerClicked.emit(this.sticker);
  }

  get stickerNumber(): string {
    return this.sticker.number.toString().padStart(3, '0');
  }
}
