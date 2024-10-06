"use client"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

export function Nav({ children }: { children: ReactNode }) {
    return <nav className="text-primary-foreground text-white hover:text-gray-500 transition 
    duration-300 font-normal text-base flex justify-left">{children}</nav>
}

export function NavLink(props: Omit<ComponentProps<typeof 
    Link>, "className">) {
    const pathname = usePathname();
    return <Link {...props} className={cn("p-4 hover:text-secondary hover:text-slate-50", pathname === props.href && "font-bold underline")} />
}