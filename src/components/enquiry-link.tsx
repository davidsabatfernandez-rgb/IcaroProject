"use client";

import { useEffect, useState, type ComponentProps } from "react";
import { usePathname } from "next/navigation";
import type { EnquiryInterest } from "@/data/enquiries";

export type { EnquiryInterest } from "@/data/enquiries";

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
  const pathname = usePathname();
  const [campaign, setCampaign] = useState<readonly [string, string][]>([]);
  useEffect(() => {
    const current = new URLSearchParams(window.location.search);
    const allowed: [string, string][] = [];
    for (const key of ["ref", "utm_source", "utm_medium", "utm_campaign"]) {
      const value = current.get(key);
      if (
        value &&
        /^[A-Za-z][A-Za-z0-9_-]{0,39}$/.test(value) &&
        !/\d{6}/.test(value)
      )
        allowed.push([key, value]);
    }
    setCampaign(allowed);
  }, [pathname]);
  const crossesToHome =
    pathname !== "/" && (href === "#contacto" || href === "/#contacto");
  const params = new URLSearchParams({ consulta: interest, origen: source });
  if (sport) params.set("deporte", sport);
  if (plan) params.set("plan", plan);
  for (const [key, value] of campaign) params.set(key, value);
  const destination = crossesToHome ? `/?${params.toString()}#contacto` : href;
  return (
    <a
      {...props}
      href={destination}
      data-track="cta_click"
      data-track-source={source}
      data-track-plan={plan}
      data-track-interest={interest}
      data-track-sport={sport}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
          return;
        if (crossesToHome) return;
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
