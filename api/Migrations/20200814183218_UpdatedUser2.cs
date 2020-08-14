using Microsoft.EntityFrameworkCore.Migrations;

namespace LMS.Migrations
{
    public partial class UpdatedUser2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Registration");

            migrationBuilder.AddColumn<int>(
                name: "userId",
                table: "Courses",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Courses_userId",
                table: "Courses",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Users_userId",
                table: "Courses",
                column: "userId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Users_userId",
                table: "Courses");

            migrationBuilder.DropIndex(
                name: "IX_Courses_userId",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "userId",
                table: "Courses");

            migrationBuilder.CreateTable(
                name: "Registration",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CourseId = table.Column<int>(type: "int", nullable: false),
                    userId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Registration", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Registration_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Registration_userId",
                table: "Registration",
                column: "userId");
        }
    }
}
