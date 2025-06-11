/*
  Warnings:

  - You are about to drop the column `decorationType` on the `moabox` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `moabox` DROP COLUMN `decorationType`,
    ADD COLUMN `decorationDesignId` INTEGER NULL;

-- CreateTable
CREATE TABLE `MoaDecorationDesign` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `imageURL` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MoaBox` ADD CONSTRAINT `MoaBox_decorationDesignId_fkey` FOREIGN KEY (`decorationDesignId`) REFERENCES `MoaDecorationDesign`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
