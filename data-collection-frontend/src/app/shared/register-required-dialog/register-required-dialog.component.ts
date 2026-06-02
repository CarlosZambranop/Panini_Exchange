import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register-required-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './register-required-dialog.component.html',
  styleUrls: ['./register-required-dialog.component.css']
})
export class RegisterRequiredDialogComponent {
  constructor(private dialogRef: MatDialogRef<RegisterRequiredDialogComponent>) {}

  register(): void {
    this.dialogRef.close('register');
  }

  cancel(): void {
    this.dialogRef.close('cancel');
  }
}
