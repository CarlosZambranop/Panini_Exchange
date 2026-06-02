import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { EduWarningDialogComponent } from '../../shared/edu-warning-dialog/edu-warning-dialog.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private fb     = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private auth   = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
    email:    ['', [Validators.required, Validators.email]],
    phone:    ['', [Validators.required, Validators.pattern(/^[+\d\s\-()\\.]{7,20}$/)]],
    city:     ['', [Validators.required, Validators.maxLength(100)]],
  });

  isLoading = false;

  get f(): { [key: string]: AbstractControl } { return this.form.controls; }

  isInvalid(name: string): boolean {
    const c = this.f[name];
    return !!c && c.invalid && (c.dirty || c.touched);
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const ref = this.dialog.open(EduWarningDialogComponent, {
      panelClass: 'dark-dialog',
      width: '520px',
      disableClose: true,
    });

    ref.afterClosed().subscribe((result: string) => {
      if (result === 'accept') {
        this.auth.register();
        this.router.navigate(['/']);
      } else if (result === 'learnMore') {
        this.auth.register();
        window.open('https://www.consumidor.gov.co/', '_blank');
        this.router.navigate(['/']);
      }
    });
  }
}
