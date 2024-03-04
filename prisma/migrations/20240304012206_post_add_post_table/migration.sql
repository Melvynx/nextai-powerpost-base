-- CreateEnum
CREATE TYPE "PostMode" AS ENUM ('SHORT', 'TWEET', 'THREAD', 'BULLET_POINT', 'TOP3', 'MAIN_POINTS', 'CODE');

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "mode" "PostMode" NOT NULL DEFAULT 'SHORT',
    "powerPost" TEXT,
    "coverUrl" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
