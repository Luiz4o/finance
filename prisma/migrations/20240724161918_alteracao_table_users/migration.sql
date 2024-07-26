/*
  Warnings:

  - You are about to drop the column `amount` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `hashPassword` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(60)`.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `amount`,
    MODIFY `hashPassword` VARCHAR(60) NOT NULL;
