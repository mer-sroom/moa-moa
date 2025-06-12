-- AlterTable
ALTER TABLE `moabox` ADD COLUMN `decorationType` ENUM('NONE', 'STAR', 'HEART', 'RIBBON') NOT NULL DEFAULT 'NONE';
