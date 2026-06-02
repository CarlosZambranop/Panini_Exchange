import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Sticker } from '../../models/sticker.model';

export interface TradeDialogData {
  sticker: Sticker;
}

@Component({
  selector: 'app-trade-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './trade-dialog.component.html',
  styleUrls: ['./trade-dialog.component.css']
})
export class TradeDialogComponent {
  data = inject<TradeDialogData>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<TradeDialogComponent>);

  confirm(): void { this.dialogRef.close('confirmed'); }
}
