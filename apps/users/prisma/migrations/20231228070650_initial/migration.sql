-- CreateEnum
CREATE TYPE "CommuterType" AS ENUM ('student', 'normal');

-- CreateTable
CREATE TABLE "commuter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "otp" TEXT,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isStudent" "CommuterType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "commuter_pkey" PRIMARY KEY ("id")
);
