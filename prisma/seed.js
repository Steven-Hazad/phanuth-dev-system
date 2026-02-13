const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      fullName: "Phanuth",
      title: "Software Engineer & Academic Researcher",
      tagline: "Building Systems with Academic Precision",
      bioKh: "ខ្ញុំគឺជា Developer ដែលផ្តោតលើការបង្កើតប្រព័ន្ធរឹងមាំ។",
      bioEn: "I am a developer focused on building robust systems.",
      gpa: 3.8, // Your actual GPA
    },
  })
  console.log("✅ Database Seeded!")
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })