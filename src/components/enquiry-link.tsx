"use client";

import type { ComponentProps } from "react";

export type EnquiryInterest = "coaching" | "collective" | "tests";

export type EnquirySelection = {
  interest: EnquiryInterest;
  source: string;
  sport?: string;
  plan?: string;
};

type EnquiryLinkProps = Omit<ComponentProps<"a">, "onClick"> & EnquirySelection;

/** Keeps the athlete's choice in the enquiry form without navigation or storage. */
export function EnquiryLink({
  interest,
  source,
  sport,
  plan,
  href = "#contacto",
  children,
  ...props
}: EnquiryLinkProps) {
  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
          return;
        window.dispatchEvent(
          new CustomEvent<EnquirySelection>("icaro-interest", {
            detail: { interest, source, sport, plan },
          }),
        );
      }}
    >
      {children}
    </a>
  );
}
