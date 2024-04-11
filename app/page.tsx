import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Welcome from "@/components/Welcome";
import { SubmitButton } from "./login/submit-button";
import { signIn } from "@/utils/supabase/signIn";
import { redirect } from "next/navigation";

export default async function Index({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/memo");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
          {<AuthButton />}
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <div className="flex flex-col gap-16 items-center">
          <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
            Welcome to Memo
          </p>
          <p className="text-lg lg:text-lg !leading-tight mx-auto max-w-xl text-center">
            A small project to explore development with the latest version and
            tooling of NextJS & Vercel.
          </p>
          <form className="animate-in flex-1 flex flex-col w-1/4 justify-center gap-2 text-foreground">
            <label className="text-md" htmlFor="email">
              Access Code
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-2"
              type="password"
              name="access-code"
              placeholder="e.g. 'demo'"
              required
            />
            <SubmitButton
              formAction={signIn}
              className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
              pendingText="Signing In..."
            >
              Sign In
            </SubmitButton>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                {searchParams.message}
              </p>
            )}
          </form>
          <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
        </div>
      </div>
    </div>
  );
}
