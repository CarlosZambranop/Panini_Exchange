using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DataCollectionAPI.Migrations
{
    /// <inheritdoc />
    public partial class RebuildForStickers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_user_data",
                table: "user_data");

            migrationBuilder.DropIndex(
                name: "IX_user_data_Email",
                table: "user_data");

            migrationBuilder.DropColumn(
                name: "AcceptanceDate",
                table: "user_data");

            migrationBuilder.DropColumn(
                name: "IpAddress",
                table: "user_data");

            migrationBuilder.DropColumn(
                name: "StickerCount",
                table: "user_data");

            migrationBuilder.RenameTable(
                name: "user_data",
                newName: "users");

            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "users",
                type: "character varying(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_users",
                table: "users",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "stickers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Team = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Category = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Rarity = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Description = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_stickers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "user_stickers",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    StickerId = table.Column<int>(type: "integer", nullable: false),
                    OwnedSince = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_stickers", x => new { x.UserId, x.StickerId });
                    table.ForeignKey(
                        name: "FK_user_stickers_stickers_StickerId",
                        column: x => x.StickerId,
                        principalTable: "stickers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_stickers_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_users_Email",
                table: "users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_user_stickers_StickerId",
                table: "user_stickers",
                column: "StickerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "user_stickers");

            migrationBuilder.DropTable(
                name: "stickers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_users",
                table: "users");

            migrationBuilder.DropIndex(
                name: "IX_users_Email",
                table: "users");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "users");

            migrationBuilder.RenameTable(
                name: "users",
                newName: "user_data");

            migrationBuilder.AddColumn<DateTime>(
                name: "AcceptanceDate",
                table: "user_data",
                type: "timestamp with time zone",
                nullable: false,
                defaultValueSql: "NOW()");

            migrationBuilder.AddColumn<string>(
                name: "IpAddress",
                table: "user_data",
                type: "character varying(45)",
                maxLength: 45,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StickerCount",
                table: "user_data",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_user_data",
                table: "user_data",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_user_data_Email",
                table: "user_data",
                column: "Email");
        }
    }
}
