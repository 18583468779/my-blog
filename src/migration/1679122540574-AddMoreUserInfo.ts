import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";
//新增用户的信息
export class AddMoreUserInfo1679122540574 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("users", [
      new TableColumn({
        name: "picture",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "email",
        type: "varchar",
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "picture");
    await queryRunner.dropColumn("users", "email");
  }
}
