/*
  Warnings:

  - You are about to drop the column `achievements` on the `education` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `education` DROP COLUMN `achievements`,
    ADD COLUMN `achievement` TEXT NULL,
    MODIFY `university` VARCHAR(191) NULL,
    MODIFY `startDate` VARCHAR(191) NULL,
    MODIFY `endDate` VARCHAR(191) NULL,
    MODIFY `gpa` DOUBLE NULL;
