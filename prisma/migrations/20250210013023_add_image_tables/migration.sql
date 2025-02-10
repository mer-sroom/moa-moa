/*
  Warnings:

  - You are about to drop the column `letterIconId` on the `letter` table. All the data in the column will be lost.
  - You are about to drop the column `letterPaperId` on the `letter` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundImageId` on the `moabox` table. All the data in the column will be lost.
  - You are about to drop the column `mailBoxImageId` on the `moabox` table. All the data in the column will be lost.
  - You are about to drop the `backgroundimage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lettericon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `letterpaper` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mailboximage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `letterIconDesignId` to the `Letter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `letterPaperDesignId` to the `Letter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `backgroundDesignId` to the `MoaBox` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mailBoxDesignId` to the `MoaBox` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `letter` DROP FOREIGN KEY `Letter_letterIconId_fkey`;

-- DropForeignKey
ALTER TABLE `letter` DROP FOREIGN KEY `Letter_letterPaperId_fkey`;

-- DropForeignKey
ALTER TABLE `moabox` DROP FOREIGN KEY `MoaBox_backgroundImageId_fkey`;

-- DropForeignKey
ALTER TABLE `moabox` DROP FOREIGN KEY `MoaBox_mailBoxImageId_fkey`;

-- DropIndex
DROP INDEX `Letter_letterIconId_fkey` ON `letter`;

-- DropIndex
DROP INDEX `Letter_letterPaperId_fkey` ON `letter`;

-- DropIndex
DROP INDEX `MoaBox_backgroundImageId_fkey` ON `moabox`;

-- DropIndex
DROP INDEX `MoaBox_mailBoxImageId_fkey` ON `moabox`;

-- AlterTable
ALTER TABLE `letter` DROP COLUMN `letterIconId`,
    DROP COLUMN `letterPaperId`,
    ADD COLUMN `letterIconDesignId` INTEGER NOT NULL,
    ADD COLUMN `letterPaperDesignId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `moabox` DROP COLUMN `backgroundImageId`,
    DROP COLUMN `mailBoxImageId`,
    ADD COLUMN `backgroundDesignId` INTEGER NOT NULL,
    ADD COLUMN `mailBoxDesignId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `backgroundimage`;

-- DropTable
DROP TABLE `lettericon`;

-- DropTable
DROP TABLE `letterpaper`;

-- DropTable
DROP TABLE `mailboximage`;

-- CreateTable
CREATE TABLE `BackgroundDesign` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `imageURL` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MailBoxDesign` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `imageURL` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LetterPaperDesign` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `imageURL` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LetterIconDesign` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `imageURL` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MoaBox` ADD CONSTRAINT `MoaBox_backgroundDesignId_fkey` FOREIGN KEY (`backgroundDesignId`) REFERENCES `BackgroundDesign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MoaBox` ADD CONSTRAINT `MoaBox_mailBoxDesignId_fkey` FOREIGN KEY (`mailBoxDesignId`) REFERENCES `MailBoxDesign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Letter` ADD CONSTRAINT `Letter_letterPaperDesignId_fkey` FOREIGN KEY (`letterPaperDesignId`) REFERENCES `LetterPaperDesign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Letter` ADD CONSTRAINT `Letter_letterIconDesignId_fkey` FOREIGN KEY (`letterIconDesignId`) REFERENCES `LetterIconDesign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
