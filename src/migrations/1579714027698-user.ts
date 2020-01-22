import {MigrationInterface, QueryRunner} from "typeorm";

export class user1579714027698 implements MigrationInterface {
    name = 'user1579714027698'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `firstName` varchar(255) NULL DEFAULT '', `lastName` varchar(255) NULL DEFAULT '', `avatar` varchar(255) NULL DEFAULT '', `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` timestamp NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
    }

}
