-- CreateTable
CREATE TABLE "Crypto" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "Symbol" TEXT NOT NULL,

    CONSTRAINT "Crypto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Data" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "high" INTEGER NOT NULL,
    "low" INTEGER NOT NULL,
    "open" INTEGER NOT NULL,
    "close" INTEGER NOT NULL,
    "volume" INTEGER NOT NULL,
    "marketCap" INTEGER NOT NULL,
    "cryptoId" TEXT NOT NULL,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_cryptoId_fkey" FOREIGN KEY ("cryptoId") REFERENCES "Crypto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
