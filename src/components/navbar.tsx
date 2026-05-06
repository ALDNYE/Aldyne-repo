"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FOOTER_DATA } from "@/constants/footer-links";
import { useState } from "react";
import {
  Show,
  UserButton,
  ClerkLoading,
  ClerkLoaded,
  ClerkDegraded,
  ClerkFailed,
} from "@clerk/nextjs";

export default function Navbar() {
  const menuSections = FOOTER_DATA.filter(
    (section) => section.category !== "Legal",
  );

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (category: string) => {
    setOpenSection((prev) => (prev === category ? null : category));
  };

  const closeAll = () => {
    setMobileOpen(false);
    setOpenSection(null);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between h-16 md:h-24 px-4 md:px-8">
          {/* LEFT: LOGO + DESKTOP MENU */}
          <div className="flex items-center gap-12">
            {/* LOGO */}
            <Link
              href="/"
              onClick={closeAll}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="bg-white p-1 rounded-sm border border-slate-100">
                <Image
                  src="/aphadyne.jpeg"
                  alt="Alphadyne"
                  width={100}
                  height={32}
                  className="object-contain h-6 md:h-8 w-auto"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm md:text-lg font-bold tracking-tight text-black uppercase">
                  Alphadyne
                </span>
                <span className="text-[10px] md:text-xs font-light tracking-widest text-slate-500 uppercase">
                  Asset Management
                </span>
              </div>
            </Link>

            {/* DESKTOP DROPDOWN MENU */}
            <div className="hidden md:flex items-center gap-8">
              {menuSections.map((section) => (
                <div
                  key={section.category}
                  className="relative group"
                >
                  <button className="flex items-center gap-1.5 text-[12px] font-bold text-slate-500 hover:text-[#0070f3] transition-colors uppercase tracking-[0.2em]">
                    {section.category}
                    <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  </button>

                  <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="w-64 bg-white border border-slate-100 shadow-2xl p-4 space-y-3">
                      {section.links.map((link) => (
                        <Link
                          key={link.slug}
                          href={`/info/${link.slug}`}
                          className="block text-[11px] font-bold text-slate-400 hover:text-[#0070f3] uppercase tracking-widest transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: AUTH + HAMBURGER */}
          <div className="flex items-center gap-3 md:gap-8">
            {/* AUTH */}
            <ClerkLoading>
              <div className="h-8 w-16 md:h-10 md:w-24 bg-slate-50 animate-pulse border border-slate-100" />
            </ClerkLoading>

            <ClerkLoaded>
              <Show when="signed-out">
                <Button
                  variant="outline"
                  asChild
                  className="rounded-none border-[#0070f3] border-[1.5px] text-[#0070f3] bg-transparent hover:bg-[#0070f3] hover:text-white font-bold text-[10px] md:text-[12px] uppercase tracking-[0.2em] px-4 md:px-8 h-9 md:h-12 transition-all duration-300 shadow-none"
                >
                  <Link href="/sign-in">Log In</Link>
                </Button>
              </Show>

              <Show when="signed-in">
                <div className="flex items-center gap-4 md:gap-10">
                  <Link
                    href="/dashboard"
                    className="hidden md:block text-[12px] font-bold text-black hover:text-[#0070f3] transition-colors uppercase tracking-[0.2em]"
                  >
                    Dashboard
                  </Link>
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox:
                          "h-8 w-8 md:h-10 md:w-10 border border-[#0070f3] rounded-none hover:opacity-80 transition-all",
                        userButtonPopoverCard:
                          "bg-white border border-slate-200 shadow-xl rounded-none",
                        userButtonPopoverFooter: "hidden",
                      },
                    }}
                  />
                </div>
              </Show>

              <ClerkDegraded>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Connecting...
                </span>
              </ClerkDegraded>
            </ClerkLoaded>

            <ClerkFailed>
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">
                Offline
              </span>
            </ClerkFailed>

            {/* HAMBURGER — mobile only */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 text-slate-700 hover:text-[#0070f3] transition-colors"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU PANEL */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white">
            {menuSections.map((section) => (
              <div
                key={section.category}
                className="border-b border-slate-100"
              >
                {/* Section header — accordion trigger */}
                <button
                  className="w-full flex items-center justify-between px-5 py-4"
                  onClick={() => toggleSection(section.category)}
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
                    {section.category}
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
                      openSection === section.category ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Links — revealed on tap */}
                {openSection === section.category && (
                  <div className="px-5 pb-4 space-y-4 bg-slate-50">
                    {section.links.map((link) => (
                      <Link
                        key={link.slug}
                        href={`/info/${link.slug}`}
                        onClick={closeAll}
                        className="flex items-center gap-2 pt-3 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#0070f3] transition-colors"
                      >
                        <span className="w-1 h-1 bg-[#0070f3] inline-block shrink-0" />
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Dashboard link for signed-in mobile users */}
            <Show when="signed-in">
              <Link
                href="/dashboard"
                onClick={closeAll}
                className="flex items-center px-5 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 hover:text-[#0070f3] transition-colors border-b border-slate-100"
              >
                Dashboard
              </Link>
            </Show>
          </div>
        )}
      </nav>
    </>
  );
}
