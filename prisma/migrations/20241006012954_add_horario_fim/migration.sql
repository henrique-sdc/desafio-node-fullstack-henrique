/*
  Warnings:

  - Added the required column `horarioFim` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evento" ADD COLUMN     "horarioFim" TIMESTAMP(3) NOT NULL;
