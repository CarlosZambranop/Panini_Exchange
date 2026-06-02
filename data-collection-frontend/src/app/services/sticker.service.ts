import { Injectable } from '@angular/core';
import { Sticker, Rarity, TopCollector } from '../models/sticker.model';

const FAKE_OWNERS = [
  { displayName: 'Carlos R.',    city: 'Bogotá',       ownedSince: '2024-01-15' },
  { displayName: 'Maria L.',     city: 'Medellín',     ownedSince: '2024-02-03' },
  { displayName: 'Juan T.',      city: 'Cali',         ownedSince: '2024-02-18' },
  { displayName: 'Sofia H.',     city: 'Barranquilla', ownedSince: '2024-03-05' },
  { displayName: 'Andres C.',    city: 'Cartagena',    ownedSince: '2024-03-21' },
  { displayName: 'Valentina G.', city: 'Bucaramanga',  ownedSince: '2024-04-02' },
  { displayName: 'Diego M.',     city: 'Pereira',      ownedSince: '2024-04-15' },
  { displayName: 'Camila V.',    city: 'Manizales',    ownedSince: '2024-05-01' },
  { displayName: 'Luis P.',      city: 'Ibagué',       ownedSince: '2024-05-20' },
  { displayName: 'Natalia R.',   city: 'Bogotá',       ownedSince: '2024-06-07' },
  { displayName: 'Felipe A.',    city: 'Medellín',     ownedSince: '2024-06-25' },
  { displayName: 'Isabela S.',   city: 'Cali',         ownedSince: '2024-07-10' },
];

/** Pick n random owners from the pool (no duplicates) */
function pickOwners(n: number, offset = 0) {
  return FAKE_OWNERS.slice(offset % FAKE_OWNERS.length)
    .concat(FAKE_OWNERS.slice(0, offset % FAKE_OWNERS.length))
    .slice(0, Math.min(n, FAKE_OWNERS.length));
}

const RAW: Array<{
  id: number; number: string; playerName: string; team: string; position: string;
  nationality: string; flag: string; rarity: Rarity; gradient: string; owners: number; ownerOffset: number;
}> = [
  { id:1,  number:'001', playerName:'Leo Messi',         team:'Inter Miami',    position:'Delantero',      nationality:'Argentina',  flag:'🇦🇷', rarity:'Legend', gradient:'linear-gradient(135deg,#BF360C,#FF8F00,#FFD600)', owners:12, ownerOffset:0  },
  { id:2,  number:'002', playerName:'Cristiano Ronaldo', team:'Al Nassr',       position:'Delantero',      nationality:'Portugal',   flag:'🇵🇹', rarity:'Legend', gradient:'linear-gradient(135deg,#BF360C,#FF8F00,#FFD600)', owners:8,  ownerOffset:2  },
  { id:3,  number:'003', playerName:'Kylian Mbappé',     team:'Real Madrid',    position:'Delantero',      nationality:'Francia',    flag:'🇫🇷', rarity:'Epic',   gradient:'linear-gradient(135deg,#4A148C,#7B1FA2)',         owners:9,  ownerOffset:1  },
  { id:4,  number:'004', playerName:'Erling Haaland',    team:'Man City',       position:'Delantero',      nationality:'Noruega',    flag:'🇳🇴', rarity:'Epic',   gradient:'linear-gradient(135deg,#1A237E,#1565C0)',         owners:7,  ownerOffset:3  },
  { id:5,  number:'005', playerName:'Vinicius Jr.',      team:'Real Madrid',    position:'Extremo',        nationality:'Brasil',     flag:'🇧🇷', rarity:'Epic',   gradient:'linear-gradient(135deg,#1B5E20,#388E3C)',         owners:10, ownerOffset:5  },
  { id:6,  number:'006', playerName:'Pedri',             team:'FC Barcelona',   position:'Mediocampista',  nationality:'España',     flag:'🇪🇸', rarity:'Rare',   gradient:'linear-gradient(135deg,#880E4F,#C2185B)',         owners:6,  ownerOffset:4  },
  { id:7,  number:'007', playerName:'Jude Bellingham',   team:'Real Madrid',    position:'Mediocampista',  nationality:'Inglaterra', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', rarity:'Epic',   gradient:'linear-gradient(135deg,#BF360C,#E64A19)',         owners:11, ownerOffset:0  },
  { id:8,  number:'008', playerName:'Kevin De Bruyne',   team:'Man City',       position:'Mediocampista',  nationality:'Bélgica',    flag:'🇧🇪', rarity:'Epic',   gradient:'linear-gradient(135deg,#1A237E,#1565C0)',         owners:5,  ownerOffset:6  },
  { id:9,  number:'009', playerName:'Rodri',             team:'Man City',       position:'Mediocampista',  nationality:'España',     flag:'🇪🇸', rarity:'Rare',   gradient:'linear-gradient(135deg,#1A237E,#1565C0)',         owners:4,  ownerOffset:7  },
  { id:10, number:'010', playerName:'Lamine Yamal',      team:'FC Barcelona',   position:'Extremo',        nationality:'España',     flag:'🇪🇸', rarity:'Rare',   gradient:'linear-gradient(135deg,#880E4F,#C2185B)',         owners:8,  ownerOffset:2  },
  { id:11, number:'011', playerName:'Alisson Becker',    team:'Liverpool',      position:'Portero',        nationality:'Brasil',     flag:'🇧🇷', rarity:'Rare',   gradient:'linear-gradient(135deg,#B71C1C,#E53935)',         owners:3,  ownerOffset:9  },
  { id:12, number:'012', playerName:'Thibaut Courtois',  team:'Real Madrid',    position:'Portero',        nationality:'Bélgica',    flag:'🇧🇪', rarity:'Rare',   gradient:'linear-gradient(135deg,#BF360C,#E64A19)',         owners:4,  ownerOffset:8  },
  { id:13, number:'013', playerName:'Virgil Van Dijk',   team:'Liverpool',      position:'Defensa',        nationality:'Países Bajos',flag:'🇳🇱', rarity:'Rare',   gradient:'linear-gradient(135deg,#B71C1C,#E53935)',         owners:6,  ownerOffset:3  },
  { id:14, number:'014', playerName:'Rúben Dias',        team:'Man City',       position:'Defensa',        nationality:'Portugal',   flag:'🇵🇹', rarity:'Common', gradient:'linear-gradient(135deg,#1A237E,#1565C0)',         owners:2,  ownerOffset:10 },
  { id:15, number:'015', playerName:'Raphinha',          team:'FC Barcelona',   position:'Extremo',        nationality:'Brasil',     flag:'🇧🇷', rarity:'Common', gradient:'linear-gradient(135deg,#880E4F,#C2185B)',         owners:3,  ownerOffset:9  },
  { id:16, number:'016', playerName:'Mohamed Salah',     team:'Liverpool',      position:'Extremo',        nationality:'Egipto',     flag:'🇪🇬', rarity:'Epic',   gradient:'linear-gradient(135deg,#B71C1C,#E53935)',         owners:9,  ownerOffset:1  },
  { id:17, number:'017', playerName:'Robert Lewandowski',team:'FC Barcelona',   position:'Delantero',      nationality:'Polonia',    flag:'🇵🇱', rarity:'Rare',   gradient:'linear-gradient(135deg,#880E4F,#C2185B)',         owners:5,  ownerOffset:6  },
  { id:18, number:'018', playerName:'Bukayo Saka',       team:'Arsenal',        position:'Extremo',        nationality:'Inglaterra', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', rarity:'Common', gradient:'linear-gradient(135deg,#B71C1C,#C62828)',         owners:4,  ownerOffset:7  },
  { id:19, number:'019', playerName:'Phil Foden',        team:'Man City',       position:'Mediocampista',  nationality:'Inglaterra', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', rarity:'Rare',   gradient:'linear-gradient(135deg,#1A237E,#1565C0)',         owners:6,  ownerOffset:4  },
  { id:20, number:'020', playerName:'Antoine Griezmann', team:'Atlético Madrid',position:'Delantero',      nationality:'Francia',    flag:'🇫🇷', rarity:'Common', gradient:'linear-gradient(135deg,#B71C1C,#0D47A1)',         owners:3,  ownerOffset:9  },
  { id:21, number:'021', playerName:'Bernardo Silva',    team:'Man City',       position:'Mediocampista',  nationality:'Portugal',   flag:'🇵🇹', rarity:'Common', gradient:'linear-gradient(135deg,#1A237E,#1565C0)',         owners:2,  ownerOffset:10 },
  { id:22, number:'022', playerName:'Bruno Fernandes',   team:'Man Utd',        position:'Mediocampista',  nationality:'Portugal',   flag:'🇵🇹', rarity:'Rare',   gradient:'linear-gradient(135deg,#B71C1C,#C62828)',         owners:5,  ownerOffset:5  },
  { id:23, number:'023', playerName:'Toni Kroos',        team:'Real Madrid',    position:'Mediocampista',  nationality:'Alemania',   flag:'🇩🇪', rarity:'Legend', gradient:'linear-gradient(135deg,#BF360C,#FF8F00,#FFD600)', owners:7,  ownerOffset:3  },
  { id:24, number:'024', playerName:'Luka Modric',       team:'Real Madrid',    position:'Mediocampista',  nationality:'Croacia',    flag:'🇭🇷', rarity:'Legend', gradient:'linear-gradient(135deg,#BF360C,#FF8F00,#FFD600)', owners:9,  ownerOffset:1  },
  { id:25, number:'025', playerName:'Harry Kane',        team:'Bayern Munich',  position:'Delantero',      nationality:'Inglaterra', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', rarity:'Epic',   gradient:'linear-gradient(135deg,#F57F17,#F9A825)',         owners:8,  ownerOffset:2  },
  { id:26, number:'026', playerName:'Sadio Mané',        team:'Al Nassr',       position:'Extremo',        nationality:'Senegal',    flag:'🇸🇳', rarity:'Common', gradient:'linear-gradient(135deg,#0D47A1,#1565C0)',         owners:2,  ownerOffset:10 },
  { id:27, number:'027', playerName:'Neymar Jr.',        team:'Al Hilal',       position:'Extremo',        nationality:'Brasil',     flag:'🇧🇷', rarity:'Epic',   gradient:'linear-gradient(135deg,#1B5E20,#2E7D32)',         owners:6,  ownerOffset:4  },
  { id:28, number:'028', playerName:'Gareth Bale',       team:'Retirado',       position:'Extremo',        nationality:'Gales',      flag:'🏴󠁧󠁢󠁷󠁬󠁳󠁿', rarity:'Rare',   gradient:'linear-gradient(135deg,#1B5E20,#388E3C)',         owners:3,  ownerOffset:8  },
  { id:29, number:'029', playerName:'Karim Benzema',     team:'Al Ittihad',     position:'Delantero',      nationality:'Francia',    flag:'🇫🇷', rarity:'Legend', gradient:'linear-gradient(135deg,#F57F17,#FF8F00)',         owners:7,  ownerOffset:3  },
  { id:30, number:'030', playerName:'Franck Kessié',     team:'Al Ahli',        position:'Mediocampista',  nationality:'Costa de Marfil',flag:'🇨🇮', rarity:'Common', gradient:'linear-gradient(135deg,#FF6F00,#FF8F00)',      owners:1,  ownerOffset:11 },
  { id:31, number:'031', playerName:'Jamal Musiala',     team:'Bayern Munich',  position:'Mediocampista',  nationality:'Alemania',   flag:'🇩🇪', rarity:'Rare',   gradient:'linear-gradient(135deg,#F57F17,#F9A825)',         owners:5,  ownerOffset:5  },
  { id:32, number:'032', playerName:'Florian Wirtz',     team:'Bayer Leverkusen',position:'Mediocampista', nationality:'Alemania',   flag:'🇩🇪', rarity:'Rare',   gradient:'linear-gradient(135deg,#B71C1C,#C62828)',         owners:4,  ownerOffset:7  },
  { id:33, number:'033', playerName:'Declan Rice',       team:'Arsenal',        position:'Mediocampista',  nationality:'Inglaterra', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', rarity:'Common', gradient:'linear-gradient(135deg,#B71C1C,#C62828)',         owners:3,  ownerOffset:9  },
  { id:34, number:'034', playerName:'Federico Valverde', team:'Real Madrid',    position:'Mediocampista',  nationality:'Uruguay',    flag:'🇺🇾', rarity:'Common', gradient:'linear-gradient(135deg,#BF360C,#E64A19)',         owners:2,  ownerOffset:10 },
  { id:35, number:'035', playerName:'Gavi',              team:'FC Barcelona',   position:'Mediocampista',  nationality:'España',     flag:'🇪🇸', rarity:'Rare',   gradient:'linear-gradient(135deg,#880E4F,#C2185B)',         owners:4,  ownerOffset:6  },
  { id:36, number:'036', playerName:'Niclas Fullkrug',   team:'West Ham',       position:'Delantero',      nationality:'Alemania',   flag:'🇩🇪', rarity:'Common', gradient:'linear-gradient(135deg,#4E342E,#6D4C41)',         owners:1,  ownerOffset:11 },
  { id:37, number:'037', playerName:'Marcus Rashford',   team:'Man Utd',        position:'Extremo',        nationality:'Inglaterra', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', rarity:'Common', gradient:'linear-gradient(135deg,#B71C1C,#C62828)',         owners:3,  ownerOffset:9  },
  { id:38, number:'038', playerName:'Cody Gakpo',        team:'Liverpool',      position:'Extremo',        nationality:'Países Bajos',flag:'🇳🇱', rarity:'Common', gradient:'linear-gradient(135deg,#B71C1C,#E53935)',         owners:2,  ownerOffset:10 },
  { id:39, number:'039', playerName:'Son Heung-min',     team:'Tottenham',      position:'Extremo',        nationality:'Corea del Sur',flag:'🇰🇷', rarity:'Rare',   gradient:'linear-gradient(135deg,#37474F,#546E7A)',         owners:5,  ownerOffset:5  },
  { id:40, number:'040', playerName:'João Félix',        team:'Chelsea',        position:'Delantero',      nationality:'Portugal',   flag:'🇵🇹', rarity:'Common', gradient:'linear-gradient(135deg,#1565C0,#1E88E5)',         owners:2,  ownerOffset:10 },
  { id:41, number:'041', playerName:'Darwin Núñez',      team:'Liverpool',      position:'Delantero',      nationality:'Uruguay',    flag:'🇺🇾', rarity:'Common', gradient:'linear-gradient(135deg,#B71C1C,#E53935)',         owners:3,  ownerOffset:8  },
  { id:42, number:'042', playerName:'Khvicha Kvaratskhelia',team:'PSG',         position:'Extremo',        nationality:'Georgia',    flag:'🇬🇪', rarity:'Rare',   gradient:'linear-gradient(135deg,#1565C0,#1E88E5)',         owners:4,  ownerOffset:7  },
  { id:43, number:'043', playerName:'Victor Osimhen',    team:'Galatasaray',    position:'Delantero',      nationality:'Nigeria',    flag:'🇳🇬', rarity:'Rare',   gradient:'linear-gradient(135deg,#C62828,#FFD600)',         owners:4,  ownerOffset:6  },
  { id:44, number:'044', playerName:'Rafael Leão',       team:'AC Milan',       position:'Extremo',        nationality:'Portugal',   flag:'🇵🇹', rarity:'Common', gradient:'linear-gradient(135deg,#B71C1C,#212121)',         owners:2,  ownerOffset:10 },
  { id:45, number:'045', playerName:'Lautaro Martínez',  team:'Inter Milan',    position:'Delantero',      nationality:'Argentina',  flag:'🇦🇷', rarity:'Rare',   gradient:'linear-gradient(135deg,#1A237E,#212121)',         owners:5,  ownerOffset:5  },
  { id:46, number:'046', playerName:'Dani Carvajal',     team:'Real Madrid',    position:'Defensa',        nationality:'España',     flag:'🇪🇸', rarity:'Common', gradient:'linear-gradient(135deg,#BF360C,#E64A19)',         owners:2,  ownerOffset:10 },
  { id:47, number:'047', playerName:'Marquinhos',        team:'PSG',            position:'Defensa',        nationality:'Brasil',     flag:'🇧🇷', rarity:'Common', gradient:'linear-gradient(135deg,#1565C0,#1E88E5)',         owners:3,  ownerOffset:9  },
  { id:48, number:'048', playerName:'Manuel Neuer',      team:'Bayern Munich',  position:'Portero',        nationality:'Alemania',   flag:'🇩🇪', rarity:'Rare',   gradient:'linear-gradient(135deg,#F57F17,#F9A825)',         owners:4,  ownerOffset:7  },
  { id:49, number:'049', playerName:'Mike Maignan',      team:'AC Milan',       position:'Portero',        nationality:'Francia',    flag:'🇫🇷', rarity:'Common', gradient:'linear-gradient(135deg,#B71C1C,#212121)',         owners:2,  ownerOffset:10 },
  { id:50, number:'050', playerName:'Andrés Iniesta',    team:'Retirado',       position:'Mediocampista',  nationality:'España',     flag:'🇪🇸', rarity:'Legend', gradient:'linear-gradient(135deg,#BF360C,#FF8F00,#FFD600)', owners:11, ownerOffset:0  },
];

@Injectable({ providedIn: 'root' })
export class StickerService {

  private readonly stickers: Sticker[] = RAW.map(r => ({
    id: r.id,
    number: r.id,
    playerName: r.playerName,
    team: r.team,
    position: r.position,
    nationality: r.nationality,
    flag: r.flag,
    rarity: r.rarity,
    teamGradient: r.gradient,
    ownerCount: r.owners,
    owners: pickOwners(r.owners, r.ownerOffset),
  }));

  getAll(): Sticker[] {
    return this.stickers;
  }

  getById(id: number): Sticker | undefined {
    return this.stickers.find(s => s.id === id);
  }

  getTopCollectors(): TopCollector[] {
    // Fake collector leaderboard derived from owner data
    return [
      { displayName: 'Natalia R.',   city: 'Bogotá',       collected: 50, total: 50, rank: 1 },
      { displayName: 'Valentina G.', city: 'Bucaramanga',  collected: 42, total: 50, rank: 2 },
      { displayName: 'Sofia H.',     city: 'Barranquilla', collected: 38, total: 50, rank: 3 },
      { displayName: 'Juan T.',      city: 'Cali',         collected: 31, total: 50, rank: 4 },
      { displayName: 'Carlos R.',    city: 'Bogotá',       collected: 24, total: 50, rank: 5 },
      { displayName: 'Camila V.',    city: 'Manizales',    collected: 19, total: 50, rank: 6 },
      { displayName: 'Maria L.',     city: 'Medellín',     collected: 16, total: 50, rank: 7 },
      { displayName: 'Luis P.',      city: 'Ibagué',       collected: 12, total: 50, rank: 8 },
    ];
  }

  filterByRarity(rarity: Rarity | 'All'): Sticker[] {
    if (rarity === 'All') return this.stickers;
    return this.stickers.filter(s => s.rarity === rarity);
  }

  searchByName(query: string): Sticker[] {
    const q = query.toLowerCase();
    return this.stickers.filter(
      s => s.playerName.toLowerCase().includes(q) || s.team.toLowerCase().includes(q)
    );
  }
}
