/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_userId_fkey";

-- DropTable
DROP TABLE "Card";

-- CreateTable
CREATE TABLE "cards" (
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,
    "cvc" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("number")
);

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
