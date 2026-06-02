using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataCollectionAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddStickerFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comments",
                table: "user_data");

            migrationBuilder.AddColumn<string>(
                name: "FavoriteAlbum",
                table: "user_data",
                type: "character varying(150)",
                maxLength: 150,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StickerCount",
                table: "user_data",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FavoriteAlbum",
                table: "user_data");

            migrationBuilder.DropColumn(
                name: "StickerCount",
                table: "user_data");

            migrationBuilder.AddColumn<string>(
                name: "Comments",
                table: "user_data",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: true);
        }
    }
}
