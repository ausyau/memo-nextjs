import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Welcome";
import { redirect } from "next/navigation";
import { MemoCard } from "@/components/MemoCard";

const Memo = (): JSX.Element => {
  return (
    <div>
      <p>This is your Memo</p>
    </div>
  );
};

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  console.log("User", user);
  const memoTable =
    user.email === "demouser@demo.com" ? "memos_demo" : "memos_live";
  const { data: memos } = await supabase
    .from(memoTable)
    .select()
    .order("created_at", { ascending: false });
  console.log("*Memos are *", memos);

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-3xl px-3">
        <main className="flex-1 flex flex-col">
          <div className="animate-in flex flex-col opacity-0 max-w-4xl px-3">
            <div className="flex flex-col gap-16 items-center">
              <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
                Thanks for trying Memo
              </p>
              <p className="text-lg lg:text-lg !leading-tight mx-auto max-w-xl text-center">
                Now that you've logged in, you can view memos left for you! You
                can also write your own.
              </p>

              <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
            </div>
          </div>
          <div className="flex flex-1 flex-col flex-start justify-start">
            <h2 className="font-bold text-4xl mb-4 ">Your Memos</h2>
            {memos?.map(
              ({ created_at, title, author, memo_content }, index) => (
                <MemoCard
                  key={index}
                  date={created_at}
                  content={memo_content}
                  from={author}
                  title={title}
                />
              )
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
