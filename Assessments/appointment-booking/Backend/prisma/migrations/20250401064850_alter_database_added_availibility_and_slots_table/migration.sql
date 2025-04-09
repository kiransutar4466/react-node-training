-- CreateTable
CREATE TABLE "Avalibility" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "provider_id" UUID,
    "date" TIMESTAMP(3),
    "start" VARCHAR(50),
    "end" VARCHAR(50),
    "duration" VARCHAR(50),

    CONSTRAINT "Avalibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slots" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "avalibility_id" UUID NOT NULL,
    "provider_id" UUID NOT NULL,
    "start" VARCHAR(50),
    "end" VARCHAR(50),
    "status" VARCHAR(50),

    CONSTRAINT "Slots_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Avalibility" ADD CONSTRAINT "Avalibility_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "Provider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slots" ADD CONSTRAINT "Slots_avalibility_id_fkey" FOREIGN KEY ("avalibility_id") REFERENCES "Avalibility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slots" ADD CONSTRAINT "Slots_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
