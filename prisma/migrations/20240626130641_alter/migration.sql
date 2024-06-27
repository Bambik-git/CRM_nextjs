/*
  Warnings:

  - You are about to drop the column `Date` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `creatorUserId` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `toWhomUserId` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `creator_user_id` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to_whom_user_id` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_creatorUserId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_toWhomUserId_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "Date",
DROP COLUMN "Status",
DROP COLUMN "creatorUserId",
DROP COLUMN "toWhomUserId",
DROP COLUMN "updatedAt",
ADD COLUMN     "creator_user_id" INTEGER NOT NULL,
ADD COLUMN     "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Новая',
ADD COLUMN     "to_whom_user_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" DATE NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_creator_user_id_fkey" FOREIGN KEY ("creator_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_to_whom_user_id_fkey" FOREIGN KEY ("to_whom_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
