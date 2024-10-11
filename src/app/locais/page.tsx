"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"; // atualizado para src/components
import { Button } from "@/components/ui/button"; // atualizado para src/components
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"; // atualizado para src/components
import { Input } from "@/components/ui/input"; // atualizado para src/components
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"; // atualizado para src/components
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // atualizado para src/components
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MoreVertical, Search } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { DeleteDropdownItem } from "@/components/acoes"; // atualizado para src/components
import { buscarLocaisPorNome } from "@/app/locais/_actions/locais"; // atualizado para app/_actions

interface Local {
    id: number;
    nome: string;
    endereco: string;
    cidade: string;
    estado: string;
    portoes: string[];
    updatedAt: Date;
}

export default function Locais() {
    const [locais, setLocais] = useState<Local[]>([]);
    const [termo, setTermo] = useState("");
    const [resultados, setResultados] = useState<number | null>(null);
    const [exibirResultados, setExibirResultados] = useState(false);

    useEffect(() => {
        const carregarLocais = async () => {
            const resultadosLocais = await buscarLocaisPorNome("");
            setLocais(resultadosLocais);
            setResultados(resultadosLocais.length);
        };
        carregarLocais();
    }, []);

    const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (termo.trim() === "") {
                const resultadosLocais = await buscarLocaisPorNome("");
                setLocais(resultadosLocais);
                setResultados(resultadosLocais.length);
            } else {
                const resultadosLocais = await buscarLocaisPorNome(termo);
                setLocais(resultadosLocais);
                setResultados(resultadosLocais.length);
            }
            setExibirResultados(true);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTermo(value);

        if (value.trim() === "") {
            const carregarLocais = async () => {
                const resultadosLocais = await buscarLocaisPorNome("");
                setLocais(resultadosLocais);
                setResultados(resultadosLocais.length);
                setExibirResultados(false);
            };
            carregarLocais();
        }
    };

    return (
        <div className="bg-[#191e28] bg-cover bg-center bg-no-repeat min-h-screen w-screen h-screen z-50">
            <main className="space-y-12 p-6">
                <div className="mx-auto max-w-7xl pt-24">
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

                    <div className="bg-[#10141d] rounded-3xl p-8 pt-0 mt-6 overflow-x-auto">
                        <TabelaLocais locais={locais} termo={termo} setTermo={setTermo} handleSearch={handleSearch} handleInputChange={handleInputChange} resultados={resultados} exibirResultados={exibirResultados} />
                    </div>
                </div>
            </main>
        </div>
    );
}

function TabelaLocais({ locais, termo, setTermo, handleSearch, handleInputChange, resultados, exibirResultados }: { locais: Local[], termo: string, setTermo: React.Dispatch<React.SetStateAction<string>>, handleSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void, handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void, resultados: number | null, exibirResultados: boolean }) {
    return (
        <>
            <Table className="text-white  border-separate border-spacing-0">
                <TableHeader className="w-full">
                    <TableRow className="hover:bg-transparent">
                        <TableHead colSpan={6} className="px-4 py-2">
                            <div className="flex items-center mb-4 mt-4 flex-wrap">
                                <div className="relative flex items-center flex-grow mb-2 md:mb-0">
                                    <Search className="absolute left-3 text-[#6d99fb] w-4 h-4" />
                                    <Input
                                        type="text"
                                        placeholder="Pesquise por nome do local"
                                        className="pl-8 py-2 rounded-lg border-none border-gray-300 bg-[#333b49] placeholder:text-[#647085] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        style={{ width: '300px', minWidth: '200px' }}
                                        value={termo}
                                        onChange={handleInputChange}
                                        onKeyDown={handleSearch}
                                    />
                                </div>
                                <Link href="/locais/novo">
                                    <Button className="ml-4 px-4 py-2 bg-[#ebf0f9] text-black font-bold rounded-lg hover:bg-[#d2d6dd]">
                                        Adicionar Local
                                    </Button>
                                </Link>
                            </div>
                            {exibirResultados && (
                                <p className="text-sm text-[#cad6ec] mt-2">
                                    {resultados} {resultados === 1 ? "Resultado" : "Resultados"} encontrados para "{termo}"
                                </p>
                            )}
                        </TableHead>
                    </TableRow>
                    <TableRow className="hover:bg-transparent w-ful">
                        <TableHead className="text-[#cad6ec] w-2/6">Nome do Local</TableHead>
                        <TableHead className="text-[#cad6ec] w-2/6">Endereço</TableHead>
                        <TableHead className="text-[#cad6ec] w-1/6">Cidade e Estado</TableHead>
                        <TableHead className="text-[#cad6ec] w-1/6">Portões cadastrados</TableHead>
                        <TableHead className="text-[#cad6ec] w-1/6">Atualização</TableHead>
                        <TableHead className="w-0 hidden">
                            <span className="sr-only">Ações</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {locais.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-4">
                                Nenhum local encontrado.
                            </TableCell>
                        </TableRow>
                    ) : (
                        locais.map((local, index) => (
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
                        ))
                    )}
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
        </>
    );
}
