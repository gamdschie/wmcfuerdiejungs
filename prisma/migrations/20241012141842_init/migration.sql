-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "department" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "KudoStyle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "backgroundColor" TEXT NOT NULL,
    "textColor" TEXT NOT NULL,
    "emoji" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Kudo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "styleId" INTEGER,
    "authorId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,
    CONSTRAINT "Kudo_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES "KudoStyle" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Kudo_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Kudo_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
