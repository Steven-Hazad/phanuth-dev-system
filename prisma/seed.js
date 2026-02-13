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
  // Add this inside the main() function in prisma/seed.js
await prisma.education.createMany({
  data: [
    {
      degree: "Bachelor of Computer Science",
      university: "Norton University", // Or your university
      startDate: new Date("2021-09-01"),
      endDate: new Date("2025-07-01"),
      gpa: 3.85,
      achievements: "Top 5 of the class, Specialized in Database Systems",
    },
    {
      degree: "Full Stack Web Development",
      university: "Self-Taught / Online",
      startDate: new Date("2022-01-01"),
      endDate: null, // null means "Present"
      gpa: 4.0,
      achievements: "Mastered Next.js, MySQL, and System Design",
    },
  ],
});
// Add this inside your main() function in prisma/seed.js
await prisma.project.createMany({
  data: [
    {
      title: "Khmer E-Learning Platform",
      category: "Full Stack Web System",
      description: "A specialized learning management system designed for Cambodian students with Khmer language support and automated quiz grading.",
      techStack: "Next.js, Prisma, MySQL, Tailwind CSS",
      githubUrl: "https://github.com/phanuth/elearning",
      status: "Completed"
    },
    {
      title: "Inventory Management System",
      category: "Desktop Application",
      description: "A robust system for tracking stock levels, sales, and generating reports for small businesses.",
      techStack: "Java, MySQL, JDBC",
      githubUrl: "https://github.com/phanuth/inventory",
      status: "In Progress"
    }
  ]
});
  console.log("✅ Database Seeded!")
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })