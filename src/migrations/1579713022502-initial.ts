import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1579713022502 implements MigrationInterface {
    name = 'initial1579713022502'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `product` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `price` int NOT NULL, `image` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` timestamp NULL, `categoryId` int NULL, UNIQUE INDEX `IDX_22cc43e9a74d7498546e9a63e7` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedAt` timestamp NULL, UNIQUE INDEX `IDX_23c05c292c439d77b0de816b50` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_ff0c0301a95e517153df97f6812` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_ff0c0301a95e517153df97f6812`", undefined);
        await queryRunner.query("DROP INDEX `IDX_23c05c292c439d77b0de816b50` ON `category`", undefined);
        await queryRunner.query("DROP TABLE `category`", undefined);
        await queryRunner.query("DROP INDEX `IDX_22cc43e9a74d7498546e9a63e7` ON `product`", undefined);
        await queryRunner.query("DROP TABLE `product`", undefined);
    }

}
