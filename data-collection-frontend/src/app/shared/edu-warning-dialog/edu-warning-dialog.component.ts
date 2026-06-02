import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edu-warning-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './edu-warning-dialog.component.html',
  styleUrls: ['./edu-warning-dialog.component.css']
})
export class EduWarningDialogComponent {
  private dialogRef = inject(MatDialogRef<EduWarningDialogComponent>);

  accept(): void {
    this.dialogRef.close('accept');
  }

  learnMore(): void {
    this.dialogRef.close('learnMore');
  }
}
