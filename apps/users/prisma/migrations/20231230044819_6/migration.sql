/*
  Warnings:

  - You are about to drop the column `is_active` on the `BusPass` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `BusPass` table. All the data in the column will be lost.
  - Added the required column `userId` to the `BusPass` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BusPass" DROP CONSTRAINT "BusPass_user_id_fkey";

-- AlterTable
ALTER TABLE "BusPass" DROP COLUMN "is_active",
DROP COLUMN "user_id",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "BusPass" ADD CONSTRAINT "BusPass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
