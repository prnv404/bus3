-- CreateEnum
CREATE TYPE "CommuterType" AS ENUM ('normal', 'student');

-- CreateTable
CREATE TABLE "Commuter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "type" "CommuterType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "district" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "bussPassId" TEXT,

    CONSTRAINT "Commuter_pkey" PRIMARY KEY ("id")
);
