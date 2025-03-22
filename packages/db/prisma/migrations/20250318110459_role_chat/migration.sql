/*
  Warnings:

  - Added the required column `role` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('USER', 'ASSISTANT');

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "role" "MessageRole" NOT NULL;
