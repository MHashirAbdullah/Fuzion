"use client";
import {
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
  SparklesIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

const menuItems = [
  {
    title: "Main",
    items: [
      { title: "All Workflows", icon: FolderOpenIcon, url: "/workflows" },
      { title: "Credentials", icon: KeyIcon, url: "/credentials" },
      { title: "Executions", icon: HistoryIcon, url: "/executions" },
    ],
  },
];

export const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border/40 bg-linear-to-b from-background via-background to-muted/20">
      <SidebarHeader className="border-b border-border/40 bg-linear-to-r from-primary/5 via-primary/10 to-primary/5">
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className={`gap-x-3 h-14 hover:bg-accent/50 transition-all duration-300 hover:scale-[1.02] group ${
              isCollapsed ? "px-2 justify-center" : "px-4"
            }`}
          >
            <Link href="/" prefetch className="flex items-center gap-x-3">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-primary via-primary to-primary/70 shadow-lg group-hover:shadow-primary/50 transition-all duration-300 group-hover:rotate-[5deg] overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Image
                  src="/logos/logo-copy.svg"
                  alt="logo"
                  width={22}
                  height={22}
                  className="brightness-0 invert relative z-10"
                />
              </div>
              {!isCollapsed && (
                <span className="font-bold text-lg tracking-tight bg-linear-to-r from-foreground to-foreground/80 bg-clip-text">
                  Fuzion
                </span>
              )}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>

      <SidebarContent className={`py-4 ${isCollapsed ? "px-1.5" : "px-2"}`}>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            {!isCollapsed && (
              <SidebarGroupLabel className="px-3 text-xs font-bold text-muted-foreground/60 uppercase tracking-widest mb-3 flex items-center gap-2">
                <div className="h-px flex-1 bg-linear-to-r from-transparent via-border to-transparent" />
                {group.title}
                <div className="h-px flex-1 bg-linear-to-r from-transparent via-border to-transparent" />
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1.5">
                {group.items.map((item, index) => (
                  <SidebarMenuItem key={item.title} style={{ animationDelay: `${index * 50}ms` }} className="animate-in fade-in slide-in-from-left-2 duration-300">
                    <SidebarMenuButton
                      tooltip={item.title}
                      asChild
                      isActive={
                        item.url === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.url)
                      }
                      className={`h-11 rounded-xl transition-all duration-300 hover:bg-accent/90 hover:scale-[1.02] hover:shadow-sm data-[active=true]:bg-linear-to-r data-[active=true]:from-primary data-[active=true]:to-primary/90 data-[active=true]:text-primary-foreground data-[active=true]:shadow-lg data-[active=true]:shadow-primary/20 group relative overflow-hidden ${
                        isCollapsed ? "px-2 justify-center" : "gap-x-3 px-3"
                      }`}
                    >
                      <Link href={item.url} prefetch className="flex items-center gap-x-3">
                        <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <item.icon className="size-4 shrink-0 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                        {!isCollapsed && (
                          <span className="font-semibold text-sm relative z-10">{item.title}</span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className={`border-t border-border/40 bg-linear-to-b from-background to-muted/10 ${
        isCollapsed ? "p-1.5" : "p-2"
      }`}>
        <SidebarMenu className="space-y-1.5">
          {/* upgrade item */}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Upgrade to Pro"
              className={`h-11 rounded-xl transition-all duration-300 hover:scale-[1.02] bg-linear-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 hover:from-yellow-500/20 hover:via-orange-500/20 hover:to-yellow-500/20 border border-yellow-500/20 hover:border-yellow-500/40 hover:shadow-lg hover:shadow-yellow-500/20 group relative overflow-hidden ${
                isCollapsed ? "px-2 justify-center" : "gap-x-3 px-3"
              }`}
              onClick={() => router.push("/pricing")}
            >
              <div className="absolute inset-0 bg-linear-to-r from-yellow-500/0 via-yellow-500/30 to-yellow-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <StarIcon className="size-4 shrink-0 text-yellow-500 fill-yellow-500/30 group-hover:fill-yellow-500/50 transition-all duration-300 group-hover:rotate-360 relative z-10" />
              {!isCollapsed && (
                <span className="font-semibold text-sm relative z-10 flex items-center gap-1.5">
                  Upgrade to Pro
                  <SparklesIcon className="size-3 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </span>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* billing item */}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Billing Portal"
              className={`h-11 rounded-xl transition-all duration-300 hover:bg-accent/90 hover:scale-[1.02] hover:shadow-sm group relative overflow-hidden ${
                isCollapsed ? "px-2 justify-center" : "gap-x-3 px-3"
              }`}
              onClick={() => router.push("/billing")}
            >
              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <CreditCardIcon className="size-4 shrink-0 group-hover:scale-110 transition-transform duration-300 relative z-10" />
              {!isCollapsed && (
                <span className="font-semibold text-sm relative z-10">Billing Portal</span>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* logout item */}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              className={`h-11 rounded-xl transition-all duration-300 hover:bg-destructive/15 hover:text-destructive hover:scale-[1.02] hover:shadow-sm hover:shadow-destructive/10 group relative overflow-hidden ${
                isCollapsed ? "px-2 justify-center" : "gap-x-3 px-3"
              }`}
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/login");
                    },
                  },
                })
              }
            >
              <div className="absolute inset-0 bg-linear-to-r from-destructive/0 via-destructive/10 to-destructive/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <LogOutIcon className="size-4 shrink-0 group-hover:scale-110 group-hover:-translate-x-0.5 transition-all duration-300 relative z-10" />
              {!isCollapsed && (
                <span className="font-semibold text-sm relative z-10">Logout</span>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
