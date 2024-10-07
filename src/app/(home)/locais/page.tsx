import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/db/db";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MoreVertical, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { DeleteDropdownItem } from "./_components/AcoesLocais";

export default function Locais() {
    return (
        <div className="bg-[#191e28] bg-cover bg-center bg-no-repeat min-h-screen w-screen h-screen">
            <main className="space-y-12 p-6">
                <div className="mx-auto max-w-7xl pt-12">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className="hover:text-white">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/locais" className="text-blue-500 hover:text-white">Locais</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <h1 className="pt-8 text-white font-bold text-3xl">Locais</h1>
                    <p className="pt-2 text-white">Confira a lista de todos os locais cadastrados</p>

                    <TabelaLocais />
                </div>
            </main>
        </div>
    );
}

async function TabelaLocais() {
    const locais = await db.local.findMany({
        select: {
            id: true,
            nome: true,
            endereco: true,
            cidade: true,
            estado: true,
            portoes: true,
            updatedAt: true,
        },
        orderBy: { nome: "asc" }
    });
    if (locais.length === 0) return <p className="text-white">Nenhum local achado</p>;

    return (
        <>
            <div className="bg-[#10141d] rounded-3xl p-8 pt-0 mt-6 overflow-x-auto">
                <Table className="text-white table-fixed border-separate border-spacing-0">
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead colSpan={6} className="px-4 py-2">
                                <div className="flex items-center mb-4 mt-4 flex-wrap">
                                    <div className="relative flex items-center flex-grow mb-2 md:mb-0">
                                        <Search className="absolute left-3 text-[#6d99fb] w-4 h-4" />
                                        <Input
                                            type="text"
                                            placeholder="Pesquise por nome do local"
                                            className="pl-8 py-2 rounded-lg border-none border-gray-300 bg-[#333b49] text-[#647085] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            style={{ width: '300px', minWidth: '200px' }} 
                                        />
                                    </div>
                                    <Link href="/locais/novo">
                                        <Button className="ml-4 px-4 py-2 bg-[#ebf0f9] text-black font-bold rounded-lg hover:bg-[#d2d6dd]">
                                            Adicionar Local
                                        </Button>
                                    </Link>
                                </div>
                            </TableHead>
                        </TableRow>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="text-[#cad6ec]">Nome do Local</TableHead>
                            <TableHead className="text-[#cad6ec]">Endereço</TableHead>
                            <TableHead className="text-[#cad6ec]">Cidade e Estado</TableHead>
                            <TableHead className="text-[#cad6ec]">Portões cadastrados</TableHead>
                            <TableHead className="text-[#cad6ec]">Atualização</TableHead>
                            <TableHead className="w-0">
                                <span className="sr-only">Ações</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {locais.map((local, index) => (
                            <TableRow key={local.id} className={index % 2 === 0 ? 'bg-[#333b49]' : 'bg-[#10141d]'}>
                                <TableCell className="py-4 px-6">{local.nome}</TableCell>
                                <TableCell className="py-4 px-6 truncate">{local.endereco}</TableCell>
                                <TableCell className="py-4 px-6">{local.cidade}, {local.estado}</TableCell>
                                <TableCell className="py-4 px-6">{local.portoes.join(", ")}</TableCell>
                                <TableCell className="py-4 px-6">{new Date(local.updatedAt).toLocaleDateString()}</TableCell>
                                <TableCell className="py-4 px-6 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className='text-blue-400 ml-auto'>
                                            <MoreVertical />
                                            <span className="sr-only">Ações</span>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className='bg-[#333b49] border-none text-white'>
                                            <DropdownMenuItem asChild>
                                                <Link href={`/locais/${local.id}/editar`}>
                                                    Editar
                                                </Link>
                                            </DropdownMenuItem>
                                            <DeleteDropdownItem id={local.id.toString()} disabled={false} />
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination className="mt-4 text-white">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationLink href="#" isActive className="bg-[#4e4f5b] border-none">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">4</PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    );
}
