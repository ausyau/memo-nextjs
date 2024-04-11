"use client";

import { formatDate } from "@/utils/formatDate";
import { useState } from "react";

type MemoCardProps = {
  title: string;
  from: string;
  content: string;
  date: string;
};

export const MemoCard = ({ date, title, content, from }: MemoCardProps) => {
  const [shown] = useState("");

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
          <div className="my-5 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-4 ">
            <p className="text-md leading-6 text-gray-900">{content}</p>
          </div>
          <div className="mt-2 border-t border-gray-900/5 px-6 py-6">
            <h3 className="text-1xl leading-6 text-gray-900">From: {from}</h3>
          </div>
        </dl>
      </div>
    </div>
  );
};
