import {MigrationInterface, QueryRunner} from "typeorm";

export class user1579676993823 implements MigrationInterface {
    name = 'user1579676993823'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `firstName` `firstName` varchar(255) NULL DEFAULT ''", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `lastName` `lastName` varchar(255) NULL DEFAULT ''", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `deletedAt` `deletedAt` timestamp NULL DEFAULT null", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `deletedAt` `deletedAt` timestamp NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `lastName` `lastName` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `firstName` `firstName` varchar(255) NOT NULL", undefined);
    }

}
