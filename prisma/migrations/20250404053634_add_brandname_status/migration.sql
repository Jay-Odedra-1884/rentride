/*
  Warnings:

  - Added the required column `brandName` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "brandName" TEXT NOT NULL,
ADD COLUMN     "isBooked" BOOLEAN DEFAULT false;
