/*
  Warnings:

  - Added the required column `tel` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "tel" VARCHAR(10) NOT NULL;
