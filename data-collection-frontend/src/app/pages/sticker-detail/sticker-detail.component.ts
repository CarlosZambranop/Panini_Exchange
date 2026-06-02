import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { StickerService } from '../../services/sticker.service';
import { AuthService } from '../../services/auth.service';
import { Sticker, RARITY_COLOR, RARITY_GRADIENT } from '../../models/sticker.model';
import { TradeDialogComponent } from '../../shared/trade-dialog/trade-dialog.component';
import { RegisterRequiredDialogComponent } from '../../shared/register-required-dialog/register-required-dialog.component';

@Component({
  selector: 'app-sticker-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    NavbarComponent,
    FooterComponent,
    RegisterRequiredDialogComponent,
  ],
  templateUrl: './sticker-detail.component.html',
  styleUrls: ['./sticker-detail.component.css']
})
export class StickerDetailComponent implements OnInit {
  private route          = inject(ActivatedRoute);
  private router         = inject(Router);
  private stickerService = inject(StickerService);
  private authService    = inject(AuthService);
  private dialog         = inject(MatDialog);
  private snackBar       = inject(MatSnackBar);

  sticker: Sticker | null = null;
  notFound = false;

  readonly rarityColor    = RARITY_COLOR;
  readonly rarityGradient = RARITY_GRADIENT;

  get isRegistered(): boolean { return this.authService.isRegistered(); }

  get stickerNumber(): string {
    return this.sticker ? this.sticker.number.toString().padStart(3, '0') : '000';
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sticker = this.stickerService.getById(id) ?? null;
    if (!this.sticker) this.notFound = true;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  onWant(): void {
    if (!this.authService.isRegistered()) {
      const ref = this.dialog.open(RegisterRequiredDialogComponent, {
        panelClass: 'dark-dialog',
        width: '520px',
        disableClose: true,
      });

      ref.afterClosed().subscribe(result => {
        if (result === 'register') {
          this.router.navigate(['/register']);
        }
      });

      return;
    }

    if (!this.sticker) return;
    const ref = this.dialog.open(TradeDialogComponent, {
      data: { sticker: this.sticker },
      panelClass: 'dark-dialog',
      maxWidth: '480px',
      width: '95vw',
    });
    ref.afterClosed().subscribe((result: string | undefined) => {
      if (result === 'confirmed') {
        const msg = `Tu solicitud de intercambio para "${this.sticker!.playerName}" se envió correctamente.`;
        const close = 'Cerrar';
        this.snackBar.open(`✅ ${msg}`, close, {
          duration: 4000,
          panelClass: ['snack-success'],
        });
      }
    });
  }
}
