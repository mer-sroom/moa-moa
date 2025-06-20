-- DropForeignKey
ALTER TABLE `moabox` DROP FOREIGN KEY `MoaBox_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `moaboxparticipant` DROP FOREIGN KEY `MoaBoxParticipant_userId_fkey`;

-- DropIndex
DROP INDEX `MoaBox_ownerId_fkey` ON `moabox`;

-- AlterTable
ALTER TABLE `moabox` MODIFY `ownerId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `moaboxparticipant` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `MoaBox` ADD CONSTRAINT `MoaBox_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MoaBoxParticipant` ADD CONSTRAINT `MoaBoxParticipant_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
