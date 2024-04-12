"use client";

import { Fragment, useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Dialog, Transition } from "@headlessui/react";
import { SubmitButton } from "@/app/login/submit-button";
import { useRouter } from "next/navigation";

export function MemoInput({
  submitPost,
}: {
  submitPost: (formData: FormData) => void;
}) {
  const router = useRouter();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function submitMemo(formData: FormData) {
    submitPost(formData);
    closeModal();
    router.refresh();
  }

  return (
    <>
      <div className="fixed top-[17rem] right-10 my-2">
        <button
          type="button"
          onClick={openModal}
          className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="h-8 w-8" aria-hidden="true" />
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <form className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <input
                    className="w-full px-1.5 bg-inherit border text-2xl text-gray-800 "
                    type="text"
                    name="title"
                    placeholder="Title"
                    required
                  />
                  <div className="w-full m-1 p-[1px] bg-gray-200" />
                  <div className="mb-2">
                    <textarea
                      rows={5}
                      name="memo"
                      id="comment"
                      className="block w-full resize-none border-0 bg-transparent p-2 text-gray-800 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Write your memo"
                      defaultValue={""}
                    />
                  </div>

                  <div className="mt-4">
                    <SubmitButton
                      formAction={submitMemo}
                      className="border rounded-md px-4 py-2 text-sm text-foreground mb-2 bg-blue-100 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      pendingText="Signing Up..."
                    >
                      Post
                    </SubmitButton>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </form>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
