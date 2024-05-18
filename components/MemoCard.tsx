"use client";

import { formatDate } from "@/utils/formatDate";
import { generateRandomWords } from "@/utils/generateRandomWords";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

type MemoCardProps = {
  title: string;
  from: string;
  content: string;
  date: string;
  isRead: boolean;
  memoId: number;
};

export const MemoCard = ({
  date,
  title,
  content,
  from,
  isRead,
  memoId,
}: MemoCardProps) => {
  const [memoContent, setMemoContent] = useState(content);
  const [isMemoRead, setMemoRead] = useState(isRead);

  useEffect(() => {
    if (memoContent === "") {
      const generatedWords = generateRandomWords();
      setMemoContent(generatedWords);
    }
  }, [memoContent]);

  const supabase = createClient();
  const revealMemo = async () => {
    const { data } = await supabase
      .from("memos_live")
      .update({ read: true })
      .eq("id", memoId)
      .select();

    if (data) {
      setMemoRead(data[0].read);
      setMemoContent(data[0].memo_content);
    }
  };

  return (
    <div className="lg:col-start-4 lg:row-end-1 m-6">
      <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
        <dl className="flex flex-wrap">
          <div className="flex-auto pl-6 pt-6">
            <h2 className="text-2xl font-semibold leading-6 text-gray-900">
              {title}
            </h2>
          </div>
          <div className="flex flex-col self-center px-6 pt-4">
            <dd className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {formatDate(date)}
            </dd>
          </div>
          <div className="my-5 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-4">
            <div className="relative w-full">
              <div
                className={
                  "min-h-12 " +
                  `${!isMemoRead ? "blur hover:cursor-pointer " : "blur-none"}`
                }
              >
                <p className="text-md leading-6 text-gray-900">{memoContent}</p>
              </div>
              {!isMemoRead ? (
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 hover:cursor-pointer transition duration-200"
                  onClick={revealMemo}
                >
                  <span className="text-gray-600">
                    Click to reveal your memo!
                  </span>
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-2 border-t border-gray-900/5 px-6 py-6">
            <h3 className="text-1xl leading-6 text-gray-900">From: {from}</h3>
          </div>
        </dl>
      </div>
    </div>
  );
};
