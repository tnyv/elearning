using Microsoft.EntityFrameworkCore.Migrations;

namespace LMS.Migrations
{
    public partial class User20 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Points",
                table: "Users",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Points",
                table: "Users");
        }
    }
}
