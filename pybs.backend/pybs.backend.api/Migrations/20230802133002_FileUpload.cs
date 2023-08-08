using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pybs.backend.api.Migrations
{
    /// <inheritdoc />
    public partial class FileUpload : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "FileContent",
                table: "EmployeeEntity",
                type: "bytea",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "EmployeeEntity",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileContent",
                table: "EmployeeEntity");

            migrationBuilder.DropColumn(
                name: "FileName",
                table: "EmployeeEntity");
        }
    }
}
