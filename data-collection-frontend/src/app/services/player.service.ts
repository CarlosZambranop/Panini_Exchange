import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Sticker, Rarity } from '../models/sticker.model';

interface SportDbPlayer {
  idPlayer: string;
  strPlayer: string;
  strTeam?: string;
  strNationality?: string;
  strPosition?: string;
  strThumb?: string;
  strCutout?: string;
}

interface SportDbResponse {
  player: SportDbPlayer[] | null;
}

/** Fake owners: 20–500 */
function randomOwners(): number {
  return Math.floor(Math.random() * 481) + 20;
}

function flagEmoji(nationality: string): string {
  const map: Record<string, string> = {
    'Argentina': '🇦🇷', 'Portugal': '🇵🇹', 'France': '🇫🇷', 'Francia': '🇫🇷',
    'Norway': '🇳🇴', 'Noruega': '🇳🇴', 'Brazil': '🇧🇷', 'Brasil': '🇧🇷',
    'Spain': '🇪🇸', 'España': '🇪🇸', 'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Inglaterra': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'Belgium': '🇧🇪', 'Bélgica': '🇧🇪', 'Germany': '🇩🇪', 'Alemania': '🇩🇪',
    'Croatia': '🇭🇷', 'Croacia': '🇭🇷', 'Netherlands': '🇳🇱', 'Países Bajos': '🇳🇱',
    'Uruguay': '🇺🇾', 'Egypt': '🇪🇬', 'Egipto': '🇪🇬', 'Poland': '🇵🇱', 'Polonia': '🇵🇱',
    'Senegal': '🇸🇳', 'South Korea': '🇰🇷', 'Georgia': '🇬🇪', 'Nigeria': '🇳🇬',
    'Wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿', 'Gales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  };
  return map[nationality] ?? '🌍';
}

function rarityFor(idx: number): Rarity {
  if (idx < 2) return 'Legend';
  if (idx < 6) return 'Epic';
  if (idx < 14) return 'Rare';
  return 'Common';
}

function gradientFor(rarity: Rarity): string {
  switch (rarity) {
    case 'Legend': return 'linear-gradient(135deg,#BF360C,#FF8F00,#FFD600)';
    case 'Epic':   return 'linear-gradient(135deg,#4A148C,#7B1FA2)';
    case 'Rare':   return 'linear-gradient(135deg,#0D47A1,#1976D2)';
    default:       return 'linear-gradient(135deg,#37474F,#607D8B)';
  }
}

// ── Fallback dataset ──────────────────────────────────────────────────────
const FALLBACK_PLAYERS = [
  { name: 'Lionel Messi',         team: 'Inter Miami',     nationality: 'Argentina',     position: 'Forward',     img: 'https://www.thesportsdb.com/images/media/player/thumb/vtgedh1473438881.jpg' },
  { name: 'Cristiano Ronaldo',    team: 'Al Nassr',        nationality: 'Portugal',      position: 'Forward',     img: 'https://www.thesportsdb.com/images/media/player/thumb/lj1ro01473526139.jpg' },
  { name: 'Kylian Mbappé',        team: 'Real Madrid',     nationality: 'France',        position: 'Forward',     img: 'https://www.thesportsdb.com/images/media/player/thumb/vkgqrr1600264592.jpg' },
  { name: 'Erling Haaland',       team: 'Man City',        nationality: 'Norway',        position: 'Forward',     img: 'https://www.thesportsdb.com/images/media/player/thumb/haaland1596540579.jpg' },
  { name: 'Vinicius Jr.',         team: 'Real Madrid',     nationality: 'Brazil',        position: 'Winger',      img: 'https://www.thesportsdb.com/images/media/player/thumb/vinicius1596540485.jpg' },
  { name: 'Pedri',                team: 'FC Barcelona',    nationality: 'Spain',         position: 'Midfielder',  img: 'https://www.thesportsdb.com/images/media/player/thumb/pedri1617803543.jpg' },
  { name: 'Jude Bellingham',      team: 'Real Madrid',     nationality: 'England',       position: 'Midfielder',  img: 'https://www.thesportsdb.com/images/media/player/thumb/bellingham1617803543.jpg' },
  { name: 'Kevin De Bruyne',      team: 'Man City',        nationality: 'Belgium',       position: 'Midfielder',  img: 'https://www.thesportsdb.com/images/media/player/thumb/7mkxmh1436459963.jpg' },
  { name: 'Rodri',                team: 'Man City',        nationality: 'Spain',         position: 'Midfielder',  img: '' },
  { name: 'Lamine Yamal',         team: 'FC Barcelona',    nationality: 'Spain',         position: 'Winger',      img: '' },
  { name: 'Mohamed Salah',        team: 'Liverpool',       nationality: 'Egypt',         position: 'Winger',      img: 'https://www.thesportsdb.com/images/media/player/thumb/fbmuyh1496070622.jpg' },
  { name: 'Harry Kane',           team: 'Bayern Munich',   nationality: 'England',       position: 'Forward',     img: 'https://www.thesportsdb.com/images/media/player/thumb/kane1496070551.jpg' },
  { name: 'Bukayo Saka',          team: 'Arsenal',         nationality: 'England',       position: 'Winger',      img: '' },
  { name: 'Phil Foden',           team: 'Man City',        nationality: 'England',       position: 'Midfielder',  img: '' },
  { name: 'Virgil Van Dijk',      team: 'Liverpool',       nationality: 'Netherlands',   position: 'Defender',    img: '' },
  { name: 'Robert Lewandowski',   team: 'FC Barcelona',    nationality: 'Poland',        position: 'Forward',     img: 'https://www.thesportsdb.com/images/media/player/thumb/lewandowski1524124960.jpg' },
  { name: 'Antoine Griezmann',    team: 'Atlético Madrid', nationality: 'France',        position: 'Forward',     img: '' },
  { name: 'Bruno Fernandes',      team: 'Man Utd',         nationality: 'Portugal',      position: 'Midfielder',  img: '' },
  { name: 'Toni Kroos',           team: 'Real Madrid',     nationality: 'Germany',       position: 'Midfielder',  img: '' },
  { name: 'Luka Modric',          team: 'Real Madrid',     nationality: 'Croatia',       position: 'Midfielder',  img: '' },
  { name: 'Jamal Musiala',        team: 'Bayern Munich',   nationality: 'Germany',       position: 'Midfielder',  img: '' },
  { name: 'Florian Wirtz',        team: 'Bayer Leverkusen',nationality: 'Germany',       position: 'Midfielder',  img: '' },
  { name: 'Son Heung-min',        team: 'Tottenham',       nationality: 'South Korea',   position: 'Winger',      img: '' },
  { name: 'Victor Osimhen',       team: 'Galatasaray',     nationality: 'Nigeria',       position: 'Forward',     img: '' },
  { name: 'Lautaro Martínez',     team: 'Inter Milan',     nationality: 'Argentina',     position: 'Forward',     img: '' },
  { name: 'Gavi',                 team: 'FC Barcelona',    nationality: 'Spain',         position: 'Midfielder',  img: '' },
  { name: 'Marcus Rashford',      team: 'Man Utd',         nationality: 'England',       position: 'Winger',      img: '' },
  { name: 'Declan Rice',          team: 'Arsenal',         nationality: 'England',       position: 'Midfielder',  img: '' },
  { name: 'Khvicha Kvaratskhelia',team: 'PSG',             nationality: 'Georgia',       position: 'Winger',      img: '' },
  { name: 'Darwin Núñez',         team: 'Liverpool',       nationality: 'Uruguay',       position: 'Forward',     img: '' },
];

const API_QUERIES = [
  'Messi', 'Ronaldo', 'Mbappe', 'Haaland', 'Vinicius', 'Pedri', 'Bellingham',
  'De Bruyne', 'Salah', 'Kane'
];

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private http = inject(HttpClient);
  private readonly BASE = 'https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=';

  getStickers(): Observable<Sticker[]> {
    const requests = API_QUERIES.map(q =>
      this.http.get<SportDbResponse>(`${this.BASE}${encodeURIComponent(q)}`).pipe(
        catchError(() => of({ player: null } as SportDbResponse))
      )
    );

    return forkJoin(requests).pipe(
      map((responses) => {
        const seen = new Set<string>();
        const apiPlayers: SportDbPlayer[] = [];

        for (const resp of responses) {
          if (resp?.player) {
            for (const p of resp.player) {
              if (!seen.has(p.idPlayer)) {
                seen.add(p.idPlayer);
                apiPlayers.push(p);
              }
            }
          }
        }

        if (apiPlayers.length >= 10) {
          return this.mapApiPlayers(apiPlayers.slice(0, 30));
        }

        return this.mapFallback();
      }),
      catchError(() => of(this.mapFallback()))
    );
  }

  private mapApiPlayers(players: SportDbPlayer[]): Sticker[] {
    return players.map((p, i) => {
      const rarity = rarityFor(i);
      return {
        id: i + 1,
        number: i + 1,
        playerName: p.strPlayer,
        team: p.strTeam ?? 'Unknown',
        position: p.strPosition ?? 'Unknown',
        nationality: p.strNationality ?? 'Unknown',
        flag: flagEmoji(p.strNationality ?? ''),
        rarity,
        teamGradient: gradientFor(rarity),
        imageUrl: p.strThumb || p.strCutout || undefined,
        ownerCount: randomOwners(),
        owners: [],
      };
    });
  }

  private mapFallback(): Sticker[] {
    return FALLBACK_PLAYERS.map((p, i) => {
      const rarity = rarityFor(i);
      return {
        id: i + 1,
        number: i + 1,
        playerName: p.name,
        team: p.team,
        position: p.position,
        nationality: p.nationality,
        flag: flagEmoji(p.nationality),
        rarity,
        teamGradient: gradientFor(rarity),
        imageUrl: p.img || undefined,
        ownerCount: randomOwners(),
        owners: [],
      };
    });
  }

  getFallbackStickers(): Sticker[] {
    return this.mapFallback();
  }
}
