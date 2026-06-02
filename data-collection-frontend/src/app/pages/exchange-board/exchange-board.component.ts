import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { StickerCardComponent } from '../../shared/sticker-card/sticker-card.component';
import { TradeDialogComponent } from '../../shared/trade-dialog/trade-dialog.component';
import { RegisterRequiredDialogComponent } from '../../shared/register-required-dialog/register-required-dialog.component';
import { PlayerService } from '../../services/player.service';
import { AuthService } from '../../services/auth.service';
import { Sticker, Rarity } from '../../models/sticker.model';

@Component({
  selector: 'app-exchange-board',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    NavbarComponent,
    FooterComponent,
    StickerCardComponent,
    RegisterRequiredDialogComponent,
  ],
  templateUrl: './exchange-board.component.html',
  styleUrls: ['./exchange-board.component.css']
})
export class ExchangeBoardComponent implements OnInit {
  private playerService = inject(PlayerService);
  private authService   = inject(AuthService);
  private dialog        = inject(MatDialog);
  private router        = inject(Router);
  private cdr           = inject(ChangeDetectorRef);

  stickers: Sticker[] = [];
  filtered: Sticker[] = [];
  isLoading = true;
  error = '';
  searchQuery = '';
  selectedRarity: Rarity | 'All' = 'All';
  readonly rarities: Array<Rarity | 'All'> = ['All', 'Legend', 'Epic', 'Rare', 'Common'];

  get isLoggedIn(): boolean {
    return this.authService.isRegistered();
  }

  ngOnInit(): void {
    console.log('Home initialized');
    this.loadStickers();
  }

  private loadStickers(): void {
    console.log('Loading stickers...');
    this.isLoading = true;
    this.error = '';
    this.stickers = this.filtered = this.playerService.getFallbackStickers();

    this.playerService.getStickers().subscribe({
      next: (data: Sticker[]) => {
        console.log('Stickers loaded', data.length);
        this.stickers = data;
        this.filtered = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Sticker load failed', err);
        this.error = 'No se pudieron cargar las estampas. Intenta nuevamente.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  applyFilters(): void {
    let result = this.stickers;
    if (this.selectedRarity !== 'All') {
      result = result.filter(s => s.rarity === this.selectedRarity);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(s =>
        s.playerName.toLowerCase().includes(q) ||
        s.team.toLowerCase().includes(q) ||
        s.nationality.toLowerCase().includes(q)
      );
    }
    this.filtered = result;
  }

  onTrade(sticker: Sticker): void {
    if (!this.isLoggedIn) {
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

    this.dialog.open(TradeDialogComponent, {
      data: { sticker },
      panelClass: 'dark-dialog',
      width: '440px',
    });
  }
}
