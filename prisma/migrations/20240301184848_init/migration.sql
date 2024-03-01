-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "category" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
