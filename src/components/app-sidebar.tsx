"use client";

import * as React from "react";
import {
  LayoutDashboard,
  BarChart3,
  Receipt,
  Command,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const menuItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  // { title: "Stats", url: "/dashboard/stats", icon: BarChart3 },
  { title: "Records", url: "/dashboard/records", icon: Receipt },
];

export function AppSidebar() {
  const { user } = useUser();
  const pathname = usePathname();

  // support both master accounts
  const MASTER_USER_IDS = [
    "user_3BTsg6kSbYZtxfN2v95I3mUEnyj",
    "user_3DZ2kNO4aJttcHWOCvEVLGetvDg",
    "user_3DZ2dDCPdOnudmhX2MyuM8uPAnC",
    "user_3DZ2TDJjPROri8pIXILJByTdONg",
    "user_3DZ274PkqLpOkYZPkEOdI9xumPX",
  ];

  const isAdmin = user?.publicMetadata?.role === "admin";
  const isMaster = (!!user?.id && MASTER_USER_IDS.includes(user.id)) || isAdmin;

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border bg-secondary/30"
    >
      <SidebarHeader className="p-6 border-b border-border bg-background">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:hidden">
          <div className="bg-white p-1 rounded-sm border border-slate-100">
            <Image
              src="/aphadyne.jpeg"
              alt="Alphadyne"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="truncate font-bold text-foreground tracking-tight uppercase text-base">
            Alphadyne
            <span className="font-light text-primary"> Asset</span>
          </span>
        </div>
        <div className="group-data-[collapsible=icon]:block hidden">
          <SidebarTrigger className="text-muted-foreground hover:text-primary transition-colors" />
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-background/50">
        <SidebarGroup>
          <SidebarMenu className="gap-2 px-2 pt-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={`py-6 rounded-none transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary border-r-4 border-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <Link
                      href={item.url}
                      className="flex items-center gap-4"
                    >
                      <item.icon
                        className={`size-5 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <span className="font-bold uppercase tracking-widest text-[11px]">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* MASTER ONLY SECTION: CLIENT DIRECTORY */}
        {isMaster && (
          <SidebarGroup className="mt-4">
            <SidebarGroupLabel className="px-4 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
              Client Portals
            </SidebarGroupLabel>
            <SidebarMenu className="gap-1 px-2">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={`py-6 rounded-none border-l-2 transition-all ${
                    pathname === "/dashboard/users"
                      ? "bg-primary/10 text-primary border-primary"
                      : "hover:bg-secondary border-transparent hover:border-primary"
                  }`}
                >
                  <Link
                    href="/dashboard/users"
                    className="flex items-center gap-4"
                  >
                    <Users
                      className={`size-5 ${pathname === "/dashboard/users" ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <div className="flex flex-col">
                      <span className="font-bold uppercase tracking-widest text-[10px]">
                        Manage Clients
                      </span>
                      <span className="text-[8px] text-muted-foreground">
                        Master Directory
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border bg-background">
        <div className="flex items-center gap-3 px-2 py-2">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "rounded-none size-8 border border-border",
              },
            }}
          />
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-bold text-foreground text-xs uppercase tracking-tight">
              {user?.fullName || "Institutional User"}
            </span>
            <span className="truncate text-[10px] text-muted-foreground font-medium">
              {isMaster ? "Administrator" : "Client Account"}
            </span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
