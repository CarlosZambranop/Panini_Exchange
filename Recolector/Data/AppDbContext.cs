using DataCollectionAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace DataCollectionAPI.Data
{
    /// <summary>
    /// Entity Framework Core database context for the Data Collection application.
    /// </summary>
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<UserData> UserData { get; set; }
        public DbSet<Sticker> Stickers { get; set; }
        public DbSet<UserSticker> UserStickers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ?? UserData ????????????????????????????????????????????????????
            modelBuilder.Entity<UserData>(e =>
            {
                e.ToTable("user_data");
                e.HasKey(x => x.Id);
                e.Property(x => x.FullName).IsRequired().HasMaxLength(150);
                e.Property(x => x.Email).IsRequired().HasMaxLength(200);
                e.HasIndex(x => x.Email).IsUnique();
                e.Property(x => x.Phone).IsRequired().HasMaxLength(20);
                e.Property(x => x.City).IsRequired().HasMaxLength(100);
                e.Property(x => x.StickerCount).HasDefaultValue(0);
                e.Property(x => x.FavoriteAlbum).HasMaxLength(150);
                e.Property(x => x.IpAddress).HasMaxLength(45);
                e.Property(x => x.AcceptanceDate).HasDefaultValueSql("NOW()");
                e.Property(x => x.CreatedAt).HasDefaultValueSql("NOW()");
                e.Property(x => x.PasswordHash).IsRequired().HasMaxLength(256);
            });

            // ?? Sticker ?????????????????????????????????????????????????????
            modelBuilder.Entity<Sticker>(e =>
            {
                e.ToTable("stickers");
                e.HasKey(x => x.Id);
                e.Property(x => x.Name).IsRequired().HasMaxLength(100);
                e.Property(x => x.Team).IsRequired().HasMaxLength(100);
                e.Property(x => x.Category).IsRequired().HasMaxLength(100);
                e.Property(x => x.ImageUrl).HasMaxLength(500);
                e.Property(x => x.Description).HasMaxLength(300);
                e.Property(x => x.Rarity).HasConversion<string>();
            });

            // ?? UserSticker (many-to-many join) ?????????????????????????????
            modelBuilder.Entity<UserSticker>(e =>
            {
                e.ToTable("user_stickers");
                e.HasKey(x => new { x.UserId, x.StickerId });
                e.HasOne(x => x.User)
                 .WithMany(u => u.UserStickers)
                 .HasForeignKey(x => x.UserId)
                 .OnDelete(DeleteBehavior.Cascade);
                e.HasOne(x => x.Sticker)
                 .WithMany(s => s.UserStickers)
                 .HasForeignKey(x => x.StickerId)
                 .OnDelete(DeleteBehavior.Cascade);
            });

            // ?? Seed Data ???????????????????????????????????????????????????
            SeedData(modelBuilder);
        }

        private static void SeedData(ModelBuilder mb)
        {
            // ?? 20 Fake Stickers ?????????????????????????????????????????
            var stickers = new []
            {
                new Sticker { Id=1,  Name="Leo Messi",       Team="Inter Miami",   Category="Delantero",  Rarity=Rarity.Legend, ImageUrl="https://api.dicebear.com/7.x/shapes/svg?seed=messi",       Description="El mejor jugador de la historia." },
                new Sticker { Id=2,  Name="Cristiano R.",    Team="Al Nassr",      Category="Delantero",  Rarity=Rarity.Legend, ImageUrl="https://api.dicebear.com/7.x/shapes/svg?seed=ronaldo",     Description="Cinco Balones de Oro." },
                new Sticker { Id=3,  Name="Kylian Mbappe",   Team="Real Madrid",   Category="Delantero",  Rarity=Rarity.Epic,   ImageUrl="https://api.dicebear.com/7.x/shapes/svg?seed=mbappe",      Description="La nueva estrella del futbol mundial." },
                new Sticker { Id=4,  Name="Erling Haaland",  Team="Man City",      Category="Delantero",  Rarity=Rarity.Epic,   ImageUrl="https://api.dicebear.com/7.x/shapes/svg?seed=haaland",     Description="Maquina de goles noruega." },
                new Sticker { Id=5,  Name="Vinicius Jr.",    Team="Real Madrid",   Category="Extremo",    Rarity=Rarity.Epic,   ImageUrl="https://api.dicebear.com/7.x/shapes/svg?seed=vini",        Description="Velocidad y magia en el balompie." },
                new Sticker { Id=6,  Name="Pedri",           Team="FC Barcelona",  Category="Mediocampista", Rarity=Rarity.Rare, ImageUrl="https://api.dicebear.com/7.x/shapes/svg?seed=pedri",      Description="El cerebro del Barca." },
                new Sticker { Id=7,  Name="Jude Bellingham", Team="Real Madrid",   Category="Mediocampista", Rarity=Rarity.Epic, ImageUrl="https://api.dicebear.com/7.x/shapes/svg?seed=bellingham", Description="Completo e imparable." },
                new Sticker { Id=8,  Name="Kevin De Bruyne", Team="Man City",      Category="Mediocampista", Rarity=Rarity.Epic, ImageUrl="https://api.dicebear.com/7.x/shapes/svg?seed=kdb",        Description="Maestro del pase filtrado." },
                new Sticker { Id=9,  Name="Rodri",           Team="Man City",      Category="Mediocampista", Rarity=Rarity.Rare, ImageUrl="https://api.dicebear.com/7.x/shapes/svg?seed=rodri",      Description="Balon de Oro 2024." },
                new Sticker { Id=10, Name="Lamine Yamal",    Team="FC Barcelona",  Category="Extremo",    Rarity=Rarity.Rare,   ImageUrl="https://api.dicebear.com/7.x/shapes/svg?seed=yamal",       Description="La joya mas joven del futbol." },
                new Sticker { Id=11, Name="Alisson Becker",  Team="Liverpool",     Category="Portero",    Rarity=Rarity.Rare,   ImageUrl="https://api.dicebear.com/7.x/shapes/svg?seed=alisson",     Description="El mejor portero de la Premier." },
                new Sticker { Id=12, Name="Thibaut Courtois",Team="Real Madrid",   Category="Portero",    Rarity=Rarity.Rare,   ImageUrl="https://api.dicebear.com/7.x/shapes/svg?seed=courtois",    Description="Muro belga infranqueable." },
                new Sticker { Id=13, Name="Virgil Van Dijk", Team="Liverpool",     Category="Defensa",    Rarity=Rarity.Rare,   ImageUrl="https://api.dicebear.com/7.x/shapes/svg?seed=vandijk",     Description="El defensa mas dominante." },
                new Sticker { Id=14, Name="Ruben Dias",      Team="Man City",      Category="Defensa",    Rarity=Rarity.Common, ImageUrl="https://api.dicebear.com/7.x/shapes/svg?seed=dias",        Description="Lider defensivo portugues." },
                new Sticker { Id=15, Name="Raphinha",        Team="FC Barcelona",  Category="Extremo",    Rarity=Rarity.Common, ImageUrl="https://api.dicebear.com/7.x/shapes/svg?seed=raphinha",    Description="Desequilibrante por la banda." },
                new Sticker { Id=16, Name="Mohamed Salah",   Team="Liverpool",     Category="Extremo",    Rarity=Rarity.Epic,   ImageUrl="https://api.dicebear.com/7.x/shapes/svg?seed=salah",       Description="El rey de la Premier." },
                new Sticker { Id=17, Name="Robert Lewandowski", Team="FC Barcelona", Category="Delantero", Rarity=Rarity.Rare, ImageUrl="https://api.dicebear.com/7.x/shapes/svg?seed=lewa",        Description="Maquina goleadora polaca." },
                new Sticker { Id=18, Name="Bukayo Saka",     Team="Arsenal",       Category="Extremo",    Rarity=Rarity.Common, ImageUrl="https://api.dicebear.com/7.x/shapes/svg?seed=saka",        Description="El futuro del futbol ingles." },
                new Sticker { Id=19, Name="Phil Foden",      Team="Man City",      Category="Mediocampista", Rarity=Rarity.Rare, ImageUrl="https://api.dicebear.com/7.x/shapes/svg?seed=foden",      Description="El chico de Stockport." },
                new Sticker { Id=20, Name="Antoine Griezmann",Team="Atletico",     Category="Delantero",  Rarity=Rarity.Common, ImageUrl="https://api.dicebear.com/7.x/shapes/svg?seed=griezmann",  Description="El genio frances del Atletico." },
            };
            mb.Entity<Sticker>().HasData(stickers);

            // ?? 10 Fake Users ????????????????????????????????????????????
            // Passwords are all "Password123" hashed with BCrypt (pre-computed)
            const string hash = "$2a$11$rBnm6Y9Vb1234FakeHash.OOeWzQJ9Lb5H1HBJqiD/Hmx1234SEEDED";
            var seedDate = new DateTime(2024, 1, 15, 0, 0, 0, DateTimeKind.Utc);

            var users = new []
            {
                new UserData { Id=1,  FullName="Carlos Ramirez",    Email="carlos@fake.com",   Phone="+573001234567", City="Bogota",       StickerCount=18, FavoriteAlbum="Mundial 2022",     PasswordHash=hash, PrivacyPolicyAccepted=true, AcceptanceDate=seedDate, CreatedAt=seedDate },
                new UserData { Id=2,  FullName="Maria Lopez",       Email="maria@fake.com",    Phone="+573112345678", City="Medellin",     StickerCount=42, FavoriteAlbum="LaLiga 2023",      PasswordHash=hash, PrivacyPolicyAccepted=true, AcceptanceDate=seedDate, CreatedAt=seedDate },
                new UserData { Id=3,  FullName="Juan Torres",       Email="juan@fake.com",     Phone="+573223456789", City="Cali",         StickerCount=67, FavoriteAlbum="Champions 2023",   PasswordHash=hash, PrivacyPolicyAccepted=true, AcceptanceDate=seedDate, CreatedAt=seedDate },
                new UserData { Id=4,  FullName="Sofia Herrera",     Email="sofia@fake.com",    Phone="+573334567890", City="Barranquilla", StickerCount=91, FavoriteAlbum="Premier 2024",     PasswordHash=hash, PrivacyPolicyAccepted=true, AcceptanceDate=seedDate, CreatedAt=seedDate },
                new UserData { Id=5,  FullName="Andres Castro",     Email="andres@fake.com",   Phone="+573445678901", City="Cartagena",    StickerCount=23, FavoriteAlbum="Mundial 2022",     PasswordHash=hash, PrivacyPolicyAccepted=true, AcceptanceDate=seedDate, CreatedAt=seedDate },
                new UserData { Id=6,  FullName="Valentina Gomez",   Email="valentina@fake.com",Phone="+573556789012", City="Bucaramanga",  StickerCount=115,FavoriteAlbum="LaLiga 2024",     PasswordHash=hash, PrivacyPolicyAccepted=true, AcceptanceDate=seedDate, CreatedAt=seedDate },
                new UserData { Id=7,  FullName="Diego Morales",     Email="diego@fake.com",    Phone="+573667890123", City="Pereira",      StickerCount=8,  FavoriteAlbum="Champions 2024",   PasswordHash=hash, PrivacyPolicyAccepted=true, AcceptanceDate=seedDate, CreatedAt=seedDate },
                new UserData { Id=8,  FullName="Camila Vargas",     Email="camila@fake.com",   Phone="+573778901234", City="Manizales",    StickerCount=54, FavoriteAlbum="Mundial 2026",     PasswordHash=hash, PrivacyPolicyAccepted=true, AcceptanceDate=seedDate, CreatedAt=seedDate },
                new UserData { Id=9,  FullName="Luis Perez",        Email="luis@fake.com",     Phone="+573889012345", City="Ibague",       StickerCount=33, FavoriteAlbum="Premier 2024",     PasswordHash=hash, PrivacyPolicyAccepted=true, AcceptanceDate=seedDate, CreatedAt=seedDate },
                new UserData { Id=10, FullName="Natalia Reyes",     Email="natalia@fake.com",  Phone="+573990123456", City="Bogota",       StickerCount=250,FavoriteAlbum="LaLiga Legends",  PasswordHash=hash, PrivacyPolicyAccepted=true, AcceptanceDate=seedDate, CreatedAt=seedDate },
            };
            mb.Entity<UserData>().HasData(users);

            // ?? UserSticker assignments ???????????????????????????????????
            var seedDate2 = new DateTime(2024, 2, 1, 0, 0, 0, DateTimeKind.Utc);
            var assignments = new []
            {
                // Carlos (1): stickers 1,3,5,7
                new UserSticker { UserId=1, StickerId=1,  OwnedSince=seedDate2 },
                new UserSticker { UserId=1, StickerId=3,  OwnedSince=seedDate2 },
                new UserSticker { UserId=1, StickerId=5,  OwnedSince=seedDate2 },
                new UserSticker { UserId=1, StickerId=7,  OwnedSince=seedDate2 },
                // Maria (2): stickers 1,2,4,6,8,10
                new UserSticker { UserId=2, StickerId=1,  OwnedSince=seedDate2 },
                new UserSticker { UserId=2, StickerId=2,  OwnedSince=seedDate2 },
                new UserSticker { UserId=2, StickerId=4,  OwnedSince=seedDate2 },
                new UserSticker { UserId=2, StickerId=6,  OwnedSince=seedDate2 },
                new UserSticker { UserId=2, StickerId=8,  OwnedSince=seedDate2 },
                new UserSticker { UserId=2, StickerId=10, OwnedSince=seedDate2 },
                // Juan (3): stickers 1,2,3,9,11,13,15
                new UserSticker { UserId=3, StickerId=1,  OwnedSince=seedDate2 },
                new UserSticker { UserId=3, StickerId=2,  OwnedSince=seedDate2 },
                new UserSticker { UserId=3, StickerId=3,  OwnedSince=seedDate2 },
                new UserSticker { UserId=3, StickerId=9,  OwnedSince=seedDate2 },
                new UserSticker { UserId=3, StickerId=11, OwnedSince=seedDate2 },
                new UserSticker { UserId=3, StickerId=13, OwnedSince=seedDate2 },
                new UserSticker { UserId=3, StickerId=15, OwnedSince=seedDate2 },
                // Sofia (4): stickers 2,4,6,8,12,14,16,18
                new UserSticker { UserId=4, StickerId=2,  OwnedSince=seedDate2 },
                new UserSticker { UserId=4, StickerId=4,  OwnedSince=seedDate2 },
                new UserSticker { UserId=4, StickerId=6,  OwnedSince=seedDate2 },
                new UserSticker { UserId=4, StickerId=8,  OwnedSince=seedDate2 },
                new UserSticker { UserId=4, StickerId=12, OwnedSince=seedDate2 },
                new UserSticker { UserId=4, StickerId=14, OwnedSince=seedDate2 },
                new UserSticker { UserId=4, StickerId=16, OwnedSince=seedDate2 },
                new UserSticker { UserId=4, StickerId=18, OwnedSince=seedDate2 },
                // Andres (5): stickers 5,10,15,20
                new UserSticker { UserId=5, StickerId=5,  OwnedSince=seedDate2 },
                new UserSticker { UserId=5, StickerId=10, OwnedSince=seedDate2 },
                new UserSticker { UserId=5, StickerId=15, OwnedSince=seedDate2 },
                new UserSticker { UserId=5, StickerId=20, OwnedSince=seedDate2 },
                // Valentina (6): stickers 1,3,5,7,9,11,13,15,17,19
                new UserSticker { UserId=6, StickerId=1,  OwnedSince=seedDate2 },
                new UserSticker { UserId=6, StickerId=3,  OwnedSince=seedDate2 },
                new UserSticker { UserId=6, StickerId=5,  OwnedSince=seedDate2 },
                new UserSticker { UserId=6, StickerId=7,  OwnedSince=seedDate2 },
                new UserSticker { UserId=6, StickerId=9,  OwnedSince=seedDate2 },
                new UserSticker { UserId=6, StickerId=11, OwnedSince=seedDate2 },
                new UserSticker { UserId=6, StickerId=13, OwnedSince=seedDate2 },
                new UserSticker { UserId=6, StickerId=15, OwnedSince=seedDate2 },
                new UserSticker { UserId=6, StickerId=17, OwnedSince=seedDate2 },
                new UserSticker { UserId=6, StickerId=19, OwnedSince=seedDate2 },
                // Diego (7): stickers 2,16
                new UserSticker { UserId=7, StickerId=2,  OwnedSince=seedDate2 },
                new UserSticker { UserId=7, StickerId=16, OwnedSince=seedDate2 },
                // Camila (8): stickers 1,4,7,10,13,16,19
                new UserSticker { UserId=8, StickerId=1,  OwnedSince=seedDate2 },
                new UserSticker { UserId=8, StickerId=4,  OwnedSince=seedDate2 },
                new UserSticker { UserId=8, StickerId=7,  OwnedSince=seedDate2 },
                new UserSticker { UserId=8, StickerId=10, OwnedSince=seedDate2 },
                new UserSticker { UserId=8, StickerId=13, OwnedSince=seedDate2 },
                new UserSticker { UserId=8, StickerId=16, OwnedSince=seedDate2 },
                new UserSticker { UserId=8, StickerId=19, OwnedSince=seedDate2 },
                // Luis (9): stickers 6,8,18,20
                new UserSticker { UserId=9, StickerId=6,  OwnedSince=seedDate2 },
                new UserSticker { UserId=9, StickerId=8,  OwnedSince=seedDate2 },
                new UserSticker { UserId=9, StickerId=18, OwnedSince=seedDate2 },
                new UserSticker { UserId=9, StickerId=20, OwnedSince=seedDate2 },
                // Natalia (10): all 20 stickers
                new UserSticker { UserId=10, StickerId=1,  OwnedSince=seedDate2 },
                new UserSticker { UserId=10, StickerId=2,  OwnedSince=seedDate2 },
                new UserSticker { UserId=10, StickerId=3,  OwnedSince=seedDate2 },
                new UserSticker { UserId=10, StickerId=4,  OwnedSince=seedDate2 },
                new UserSticker { UserId=10, StickerId=5,  OwnedSince=seedDate2 },
                new UserSticker { UserId=10, StickerId=6,  OwnedSince=seedDate2 },
                new UserSticker { UserId=10, StickerId=7,  OwnedSince=seedDate2 },
                new UserSticker { UserId=10, StickerId=8,  OwnedSince=seedDate2 },
                new UserSticker { UserId=10, StickerId=9,  OwnedSince=seedDate2 },
                new UserSticker { UserId=10, StickerId=10, OwnedSince=seedDate2 },
                new UserSticker { UserId=10, StickerId=11, OwnedSince=seedDate2 },
                new UserSticker { UserId=10, StickerId=12, OwnedSince=seedDate2 },
                new UserSticker { UserId=10, StickerId=13, OwnedSince=seedDate2 },
                new UserSticker { UserId=10, StickerId=14, OwnedSince=seedDate2 },
                new UserSticker { UserId=10, StickerId=15, OwnedSince=seedDate2 },
                new UserSticker { UserId=10, StickerId=16, OwnedSince=seedDate2 },
                new UserSticker { UserId=10, StickerId=17, OwnedSince=seedDate2 },
                new UserSticker { UserId=10, StickerId=18, OwnedSince=seedDate2 },
                new UserSticker { UserId=10, StickerId=19, OwnedSince=seedDate2 },
                new UserSticker { UserId=10, StickerId=20, OwnedSince=seedDate2 },
            };
            mb.Entity<UserSticker>().HasData(assignments);
        }
    }
}
