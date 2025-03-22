/*
  Warnings:

  - You are about to alter the column `price` on the `ChargingStation` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `powerOutput` on the `ChargingStation` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Made the column `price` on table `ChargingStation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `powerOutput` on table `ChargingStation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ChargingStation" ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "powerOutput" SET NOT NULL,
ALTER COLUMN "powerOutput" SET DATA TYPE INTEGER;
