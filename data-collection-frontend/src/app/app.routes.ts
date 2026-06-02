import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/exchange-board/exchange-board.component')
        .then(m => m.ExchangeBoardComponent)
  },
  {
    path: 'register',
    redirectTo: 'registro',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/register/register.component')
        .then(m => m.RegisterComponent)
  },
  {
    path: 'sticker/:id',
    loadComponent: () =>
      import('./pages/sticker-detail/sticker-detail.component')
        .then(m => m.StickerDetailComponent)
  },
  {
    path: 'politica-privacidad',
    loadComponent: () =>
      import('./pages/privacy/privacy.component')
        .then(m => m.PrivacyComponent)
  },
  { path: '**', redirectTo: '' }
];
