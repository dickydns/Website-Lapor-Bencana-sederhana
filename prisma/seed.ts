import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import "dotenv/config";

const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.create({
        data:{
            email: "admin@admin.com",
            name: "Admin User",
            role:'administrator',
            password:await bcrypt.hash("admin",12),
        }
  });

   const category = await prisma.category.create({
      data:{
        title: "Banjir",
      }
  });

  console.log({ user, category });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});
