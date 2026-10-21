"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const whyLinks = [
  ["Why Families Choose Us", "/why-oj#why-families"],
  ["Trusted Care In Your Home", "/why-oj#trusted-care"],
  ["Compassionate Care, Better Life", "/why-oj#promise"],
  ["Support Systems", "/why-oj#support-systems"],
  ["Technology in Care", "/why-oj#technology"],
];

const aboutLinks = [
  ["A Letter from the Founder", "/about#founder"],
  ["Who We Are", "/about#who-we-are"],
  ["Our Team", "/about#who-we-are"],
  ["Core Values", "/about#why-oj"],
  ["Our Philosophy", "/about#dignity"],
  ["Family Education", "/about#family-education"],
  ["Quality Assurance", "/about#quality"],
];

const serviceLinks = [
  ["Personal Care", "/personal-care"],
  ["Companion Care", "/companion-care"],
  ["Memory & Dementia Care", "/memory-care"],
  ["Cognitive Wellness", "/cognitive-wellness"],
  ["Recovery & Transitional Care", "/recovery-care"],
  ["Chronic Disease Management", "/chronic-care"],
  ["Respite Care", "/respite-care"],
  ["Medication Support", "/medication-support"],
];

const mobileLinks = [
  ["About Us", "/about", aboutLinks],
  ["Services", "/services", serviceLinks],
  ["Why OJ", "/why-oj", whyLinks],
  ["Testimonials", "/testimonials", []],
  ["Contact", "/contact", []],
] as const;

function Brand() {
  return (
    <Link className="flex shrink-0 items-center no-underline" href="/">
      <Image
        src="/images/oj-home-care-logo.jpg"
        alt="OJ Home Care logo"
        width={52}
        height={52}
        className="mr-3.5 h-[52px] w-[52px] rounded-full bg-white object-cover max-[420px]:mr-2 max-[420px]:h-11 max-[420px]:w-11"
        priority
      />
      <span className="text-[23px] leading-tight font-bold text-white max-[1399px]:text-lg max-[420px]:text-lg">
        OJ Home Care
        <small className="block text-[13px] font-normal tracking-[0.04em] text-[#7FB5AE] max-[767px]:hidden">
          Caring Hearts, Helping Hands
        </small>
      </span>
    </Link>
  );
}

function Dropdown({
  title,
  href,
  links,
}: {
  title: string;
  href: string;
  links: string[][];
}) {
  return (
    <span className="group relative inline-block">
      <Link
        href={href}
        aria-haspopup="true"
        className="whitespace-nowrap text-[15px] text-white no-underline hover:text-[#7FD1C8] max-[1399px]:text-sm"
      >
        {title}
      </Link>
      <span className="absolute top-full left-0 z-[200] hidden min-w-[250px] rounded-b-lg bg-[#092D3C] py-2 group-hover:block group-focus-within:block">
        {links.map(([label, url]) => (
          <Link
            key={label}
            href={url}
            className="block whitespace-nowrap px-[18px] py-2.5 text-[15px] text-white no-underline hover:bg-[#0F6E6E]"
          >
            {label}
          </Link>
        ))}
      </span>
    </span>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  function closeMenu() {
    setMenuOpen(false);
    setOpenSection(null);
  }

  return (
    <header className="sticky top-0 z-[1000]">
      <nav className="w-full bg-[#092D3C] py-4">
        <div className="mx-auto flex w-full max-w-[1300px] items-center justify-between px-10 max-[1100px]:px-6 max-[420px]:px-4">
          <Brand />
          <div className="hidden items-center gap-4 min-[1101px]:flex">
            <Link
              href="/services"
              className="whitespace-nowrap text-[15px] text-white no-underline hover:text-[#7FD1C8] max-[1399px]:text-sm"
            >
              Services
            </Link>
            <Dropdown title="Why OJ" href="/why-oj" links={whyLinks} />
            <Link
              href="/testimonials"
              className="whitespace-nowrap text-[15px] text-white no-underline hover:text-[#7FD1C8] max-[1399px]:text-sm"
            >
              Testimonials
            </Link>
            <Link
              href="/contact"
              className="whitespace-nowrap text-[15px] text-white no-underline hover:text-[#7FD1C8] max-[1399px]:text-sm"
            >
              Contact
            </Link>
            <Dropdown title="About Us" href="/about" links={aboutLinks} />
            <Link
              href="/contact"
              className="whitespace-nowrap rounded-lg bg-[#0D7377] px-4 py-2.5 font-semibold text-white no-underline transition-colors hover:bg-[#0B5656] max-[1399px]:text-[13px]"
            >
              Schedule a Free Consultation
            </Link>
          </div>
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="hidden cursor-pointer border-0 bg-transparent p-2 text-[28px] leading-none text-white max-[1100px]:block"
          >
            &#9776;
          </button>
        </div>
      </nav>

      <button
        type="button"
        aria-label="Close navigation menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
        className={`fixed inset-0 z-[9998] border-0 bg-black/25 backdrop-blur-[3px] transition-opacity ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />
      <aside
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed top-0 right-0 z-[9999] flex h-dvh w-[250px] max-w-[68%] flex-col bg-[#1A2E35] p-7 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={closeMenu}
          aria-label="Close navigation menu"
          tabIndex={menuOpen ? 0 : -1}
          className="flex size-10 self-end items-center justify-center rounded-lg border border-white/30 bg-transparent p-0 text-3xl leading-none text-white"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="mt-[48px] flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto overscroll-contain pr-1">
          {mobileLinks.map(([label, href, children]) => (
            <div key={label}>
              {children.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setOpenSection(openSection === label ? null : label)}
                  aria-expanded={openSection === label}
                  aria-controls={`mobile-submenu-${label}`}
                  tabIndex={menuOpen ? 0 : -1}
                  className="flex w-full items-center justify-between gap-3 text-left text-[1.1rem] font-semibold tracking-[1px] text-white uppercase"
                >
                  {label}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={`h-4 w-4 shrink-0 transition-transform duration-300 ease-out ${
                      openSection === label ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              ) : (
                <Link
                  href={href}
                  onClick={closeMenu}
                  tabIndex={menuOpen ? 0 : -1}
                  className="block text-[1.1rem] font-semibold tracking-[1px] text-white uppercase no-underline"
                >
                  {label}
                </Link>
              )}
              {children.length > 0 && (
                <div
                  id={`mobile-submenu-${label}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    openSection === label ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mt-2 ml-4 flex flex-col gap-2 border-l border-white/15 pl-3">
                      <Link
                        href={href}
                        onClick={closeMenu}
                        tabIndex={menuOpen ? 0 : -1}
                        className="block text-[0.8rem] font-medium text-[#C6D5D9] no-underline"
                      >
                        Overview
                      </Link>
                      {children.map(([childLabel, childHref]) => (
                        <Link
                          key={childLabel}
                          href={childHref}
                          onClick={closeMenu}
                          tabIndex={menuOpen ? 0 : -1}
                          className="block text-[0.8rem] font-normal text-[#7FB5AE] no-underline"
                        >
                          {childLabel}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <Link
          href="/contact"
          onClick={closeMenu}
          tabIndex={menuOpen ? 0 : -1}
          className="mt-6 w-fit max-w-full shrink-0 self-start rounded-lg bg-[#0F6E6E] px-3 py-2 text-center text-[14px] leading-snug font-bold text-white uppercase no-underline"
        >
          Schedule a Free Consultation
        </Link>
      </aside>
    </header>
  );
}
