export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legend';

export interface Sticker {
  id: number;
  number: number;        // sticker # in the album (001–050)
  playerName: string;
  team: string;
  position: string;
  nationality: string;
  flag: string;          // emoji flag
  rarity: Rarity;
  teamGradient: string;  // CSS gradient string for card banner
  imageUrl?: string;
  ownerCount: number;
  owners: StickerOwner[];
}

export interface StickerOwner {
  displayName: string;
  city: string;
  ownedSince: string;
}

export interface TradeRequest {
  wantedSticker: Sticker;
  offeredSticker: Sticker;
}

export const RARITY_COLOR: Record<Rarity, string> = {
  Common:  '#78909C',
  Rare:    '#1E88E5',
  Epic:    '#AB47BC',
  Legend:  '#FF8F00',
};

export const RARITY_GRADIENT: Record<Rarity, string> = {
  Common:  'linear-gradient(135deg, #37474F 0%, #607D8B 100%)',
  Rare:    'linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)',
  Epic:    'linear-gradient(135deg, #4A148C 0%, #7B1FA2 100%)',
  Legend:  'linear-gradient(135deg, #BF360C 0%, #FF8F00 55%, #FFD600 100%)',
};

export const RARITY_LABEL: Record<Rarity, string> = {
  Common:  '⬜ Common',
  Rare:    '🔵 Rare',
  Epic:    '🟣 Epic',
  Legend:  '⭐ Legend',
};

export interface TopCollector {
  displayName: string;
  city: string;
  collected: number;
  total: number;
  rank: number;
}
