import { redirect } from "next/navigation";
import { createClient } from "./server";

export const signIn = async (formData: FormData) => {
  "use server";

  const accessCode = formData.get("access-code") as string;

  const supabase = createClient();

  const secretAccessCredentials =
    process.env.SECRET_ACCESS_CREDENTIALS?.split(" ")?.[
      process.env.SECRET_ACCESS_CODES?.split(" ")?.indexOf(accessCode) as number
    ];

  // Hacky way to implement a passcode auth with Supabase
  const { error } = await supabase.auth.signInWithPassword({
    email: secretAccessCredentials || "demouser@demo.com",
    password: accessCode,
  });

  if (error) {
    return redirect(
      "/?message=Could not authenticate user, try a gamer alias if you are stuck :)"
    );
  }

  return redirect("/memo");
};
