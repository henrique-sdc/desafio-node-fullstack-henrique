"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode, useState, useRef, useEffect } from "react";
import Image from 'next/image';
import { ChevronDown, Minus, Menu, X } from "lucide-react";

export function Nav({ children }: { children: ReactNode }) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen)
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 text-white font-normal text-base flex justify-between items-center px-4 md:px-12 py-4 z-50",
            isHomePage ? "bg-transparent" : "bg-[#191E28]" 
        )}>
            <div className="flex items-center mx-12">
                <Link href="/" passHref>
                    <Image
                        src="/images/logo.svg"
                        alt="Logo da Empresa"
                        width={50}
                        height={50}
                        className="w-auto h-auto"
                    />
                </Link>
                <div className="hidden md:flex space-x-4 ml-4">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/eventos">Eventos</NavLink>
                    <NavLink href="/locais">Locais</NavLink>
                </div>
            </div>

            <div className="flex items-center relative">
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white">
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-gray-800 text-white rounded-md shadow-lg mt-2 z-50">
                        <div className="flex flex-col p-4">
                            <NavLink href="/">Home</NavLink>
                            <NavLink href="/eventos">Eventos</NavLink>
                            <NavLink href="/locais">Locais</NavLink>
                        </div>
                    </div>
                )}

                <Image
                    src="/images/avatar.svg"
                    alt="Imagem do Perfil"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                 <span className="text-white ml-2 hidden md:block">Olá, Nome</span>
                <button onClick={toggleDropdown} className="ml-2 relative z-10">
                    {isDropdownOpen ? (
                        <Minus className="w-6 h-6 text-white" />
                    ) : (
                        <ChevronDown className="w-6 h-6 text-white" />
                    )}
                </button>

                {isDropdownOpen && (
                    <div 
                        className="absolute right-0 top-12 bg-gray-800 text-white rounded-md shadow-lg mt-2"
                        ref={dropdownRef}
                    >
                        <div className="px-4 py-2 hover:bg-gray-700">
                            <Link href="/configuracoes" className="block px-4 py-2 hover:bg-gray-700">
                                Configurações
                            </Link>
                        </div>
                        <div className="px-4 py-2 hover:bg-gray-700">
                            <Link href="/logout" className="block px-4 py-2 hover:bg-gray-700">
                                Logout
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
    const pathname = usePathname();
    return (
        <Link {...props} className={cn("p-4 hover:text-secondary hover:text-slate-50", pathname === props.href && "font-bold underline")} />
    );
}