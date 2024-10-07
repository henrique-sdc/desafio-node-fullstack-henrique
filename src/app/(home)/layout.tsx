"use client";
import { Nav } from "@/components/Nav";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Nav>{children}</Nav> 
            <div className="container my-6">{children}</div>
        </>
    );
}