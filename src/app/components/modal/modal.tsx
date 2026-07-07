"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import clsx from "clsx";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  children: ReactNode;
  size?: ModalSize;
}

export default function Modal({ open, setOpen, title, children, size="md" }: Props) {
    const sizes: Record<ModalSize, string> = {
    sm: "w-[300px]",
    md: "w-[500px]",
    lg: "w-[600px]",
    xl: "w-[1000px]",
    full: "w-[95vw]",
  };
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content 
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg ${sizes[size]}`}
          >
          
          {/* <Dialog.Title className="text-xl font-bold mb-4">
            {title}
          </Dialog.Title> */}

          {children}

          <div className="flex justify-end mt-4">
            {/* <Dialog.Close asChild>
              <button className="border px-4 py-2 rounded">
                Cerrar
              </button>
            </Dialog.Close> */}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}