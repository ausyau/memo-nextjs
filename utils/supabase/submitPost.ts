import { createClient } from "./server";

export const submitPost = async (formData: FormData) => {
  "use server";

  const title = formData.get("title") as string;
  const memo = formData.get("memo") as string;
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const memoTable =
    user?.email === "demouser@demo.com" ? "memos_demo" : "memos_live";

  const { data, error } = await supabase
    .from(memoTable)
    .insert({
      author: user?.email?.split("@")[0],
      memo_content: memo,
      title,
      user_id: user?.id,
    })
    .select();

  return data;
};
