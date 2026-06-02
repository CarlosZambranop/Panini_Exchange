import { Component } from '@angular/core';
import {
  ReactiveFormsModule, FormBuilder,
  FormGroup, Validators, AbstractControl
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CollectorService } from '../../services/user-data.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  form: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private collectorService: CollectorService,
    private router: Router
  ) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      email:    ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
      phone:    ['', [Validators.required, Validators.pattern(/^[+\d\s\-()\\.]{7,20}$/)]],
      city:     ['', [Validators.required, Validators.maxLength(100)]],
      stickerCount: [null, [Validators.required, Validators.min(0), Validators.max(100000)]],
      favoriteAlbum: ['', [Validators.maxLength(150)]],
      privacyPolicyAccepted: [false, Validators.requiredTrue]
    });
  }

  /** Convenience getter for easy access to form controls in the template */
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  /** Returns true when a control is invalid AND has been touched */
  isInvalid(controlName: string): boolean {
    const ctrl = this.f[controlName];
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.collectorService.register(this.form.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage =
          err?.error?.message ??
          err?.error?.title ??
          'Ocurrio un error inesperado. Por favor intenta de nuevo.';
      }
    });
  }
}
