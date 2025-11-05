-- AlterTable
ALTER TABLE `report` ADD COLUMN `status_report` ENUM('pending', 'progress', 'done') NOT NULL DEFAULT 'pending';
