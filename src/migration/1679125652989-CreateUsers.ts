import { MigrationInterface, QueryRunner, Table } from "typeorm";
export class CreateUsers1679125652989 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            isGenerated: true,
            type: "int",
            generationStrategy: "increment",
            isPrimary: true,
          },
          { name: "username", type: "varchar" },
          { name: "password_digest", type: "varchar" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable("users");
  }
}
