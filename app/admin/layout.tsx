// app/admin/layout.tsx
"use server";

import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/utils/supabaseClient";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();  // or const { isSignedIn, userId } = await auth();

  if (!userId) {
    return redirect("/sign-up");
  }

  const user = await currentUser();
  if (!user) {
    return redirect("/sign-up");
  }

  // According to Clerk docs / types, email may exist under primaryEmailAddress
  const maybeEmail = user.primaryEmailAddress?.emailAddress
    ?? user.emailAddresses?.[0]?.emailAddress;

  if (!maybeEmail) {
    // no email found → cannot authorize
    return redirect("/");
  }

  const email = maybeEmail.toLowerCase();

  const { data, error } = await supabase
    .from("admins")
    .select("email")
    .eq("email", email)
    .maybeSingle();

  if (error || !data) {
    return redirect("/");
  }

  // allowed
  return <>{children}</>;
}
