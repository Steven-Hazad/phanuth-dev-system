/*
  Warnings:

  - You are about to drop the column `demoUrl` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `githubUrl` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `project` DROP COLUMN `demoUrl`,
    DROP COLUMN `githubUrl`,
    DROP COLUMN `status`,
    ADD COLUMN `githubLink` VARCHAR(191) NULL,
    ADD COLUMN `liveLink` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
