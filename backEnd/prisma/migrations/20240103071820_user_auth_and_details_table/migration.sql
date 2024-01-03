/*
  Warnings:

  - You are about to drop the `UserDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserDetails" DROP CONSTRAINT "UserDetails_User_Id_fkey";

-- AlterTable
ALTER TABLE "UserAuth" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "gender" TEXT;

-- DropTable
DROP TABLE "UserDetails";
