-- CreateTable
CREATE TABLE "saving_accounts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "saving_accounts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "saving_accounts" ADD CONSTRAINT "saving_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
