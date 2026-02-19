const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const bcrypt = require("bcryptjs");

  console.log("🌱 Seeding started...");
  
  const hashedPassword = await bcrypt.hash("phanuth14", 10);
  
  const admin = await prisma.admin.upsert({
    where: { username: "phanuth_admin" },
    update: {},
    create: {
      username: "phanuth_admin",
      password: hashedPassword,
    },
  });

  console.log("✅ Admin Created:", admin.username);
  console.log("✅ Database is now initialized!");
}

main()
  .catch((e) => { 
    console.error("❌ Seeding Error:", e); 
    process.exit(1); 
  })
  .finally(async () => { 
    await prisma.$disconnect(); 
  });