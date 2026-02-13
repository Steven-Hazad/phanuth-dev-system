import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Import from the new lib file
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <section>{children}</section>;
}