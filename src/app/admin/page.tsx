import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";

export default async function AdminRootPage() {
  const user = await getAdminSession();
  if (!user) {
    redirect("/admin/login");
  }
  redirect("/admin/dashboard");
}
