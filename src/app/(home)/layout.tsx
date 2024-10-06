"use client";
import { Nav, NavLink } from "@/components/Nav";
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Minus } from "lucide-react";
import Link from "next/link";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
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
    <>
      <div className="navbar-bg flex justify-between items-center px-8">
        <Nav>
          <div className="flex items-center">
            <div className="mx-24">
              <Link href="/" passHref>
                <Image
                  src="/images/logo.svg"
                  alt="Logo da Empresa"
                  width={50}
                  height={50}
                  style={{ width: 'auto', height: 'auto' }}
                />
              </Link>
            </div>
            <div className="mr-4">
              <NavLink href="/">Home</NavLink>
            </div>
            <div className="mr-4">
              <NavLink href="/eventos">Eventos</NavLink>
            </div>
            <div>
              <NavLink href="/locais">Locais</NavLink>
            </div>
          </div>
        </Nav>

        <div className="flex items-center relative" ref={dropdownRef}>
          <Image
            src="/images/avatar.svg"
            alt="Imagem do Perfil"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-white ml-2">Olá, Nome</span>
          <button onClick={toggleDropdown} className="ml-2">
            {isDropdownOpen ? (
              <Minus className="w-6 h-6 text-white mr-24" /> // Ícone de menos quando aberto
            ) : (
              <ChevronDown className="w-6 h-6 text-white mr-24" /> // Ícone de seta quando fechado
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 bg-gray-800 text-white rounded-md shadow-lg mt-32 mr-24">
              <div className="px-4 py-2 cursor-pointer hover:bg-gray-700">
                <Link href="/" className="px-4 py-2 cursor-pointer hover:bg-gray-700" passHref>
                  Configurações
                </Link>
              </div>
              <div className="px-4 py-2 cursor-pointer hover:bg-gray-700">
                <Link href="/" className="px-4 py-2 cursor-pointer hover:bg-gray-700" passHref>
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="container my-6">{children}</div>
    </>
  );
}
