using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RECMS.Migrations
{
    /// <inheritdoc />
    public partial class _3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Testings",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Fantasma");

            migrationBuilder.UpdateData(
                table: "Testings",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Hobby", "Name" },
                values: new object[] { "Witch-hunting", "Diablo" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Testings",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "fantasma");

            migrationBuilder.UpdateData(
                table: "Testings",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Hobby", "Name" },
                values: new object[] { "Witch-hunt", "diablo" });
        }
    }
}
