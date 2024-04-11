import { redirect } from "next/navigation";
import { createClient } from "./server";

export const signOut = async () => {
  "use server";

  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/");
};
