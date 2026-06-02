/** Shape of the payload sent to the API */
export interface UserDataRequest {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  privacyPolicyAccepted: boolean;
}

/** Auth user stored in localStorage (no real personal data) */
export interface AuthUser {
  isRegistered: boolean;
  displayName: string; // e.g. "Carlos L."
  city: string;
}

// ── Collector card shown on exchange board ───────────────────────────────
export interface CollectorRequest {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  stickerCount: number;
  favoriteAlbum?: string;
  privacyPolicyAccepted: boolean;
}

export interface CollectorResponse {
  id: number;
  displayName: string;
  city: string;
  stickerCount: number;
  favoriteAlbum?: string;
  createdAt: string;
}

export type CollectorLevel = 'Principiante' | 'Coleccionista' | 'Experto';

export function getCollectorLevel(count: number): CollectorLevel {
  if (count <= 50)  return 'Principiante';
  if (count <= 200) return 'Coleccionista';
  return 'Experto';
}

export function getLevelColor(level: CollectorLevel): string {
  switch (level) {
    case 'Principiante':  return '#64b5f6';
    case 'Coleccionista': return '#81c784';
    case 'Experto':       return '#ffd54f';
  }
}
