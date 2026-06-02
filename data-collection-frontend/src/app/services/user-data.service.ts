import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CollectorRequest, CollectorResponse } from '../models/user-data.model';

/** Legacy service kept for backward compatibility — all data is local/fake */
@Injectable({ providedIn: 'root' })
export class CollectorService {

  register(_data: CollectorRequest): Observable<CollectorResponse> {
    // No-op: registration is handled by AuthService + educational modal
    return of({ id: 0, displayName: '', city: '', stickerCount: 0, privacyPolicyAccepted: true, createdAt: '' });
  }

  getAll(): Observable<CollectorResponse[]> {
    return of([]);
  }
}

export { CollectorService as UserDataService };
