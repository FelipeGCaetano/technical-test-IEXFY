/*
  Warnings:

  - You are about to drop the column `valor` on the `Opportunity` table. All the data in the column will be lost.
  - Added the required column `value` to the `Opportunity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Opportunity" DROP COLUMN "valor",
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;
