"use client";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MoreVertical, Search } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { DeleteDropdownItemEvento } from "@/components/acoes";
import { buscarEventosPorNome } from "@/app/eventos/_actions/eventos";

interface Local {
    nome: string;
    id: number;
    tipo?: string;
    portoes: string[];
    endereco: string; 
}

interface Evento {
    id: number;
    nome: string;
    tipo?: string;
    localId: number;
    local: Local; 
    data: Date;
    usuarioId: number;
    createdAt: Date;
}

export default function Eventos() {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [termo, setTermo] = useState("");
    const [resultados, setResultados] = useState<number | null>(null);
    const [exibirResultados, setExibirResultados] = useState(false);

    useEffect(() => {
        const carregarEventos = async () => {
            const resultadosEventos = await buscarEventosPorNome(""); 
            const eventosFormatados = formatarEventos(resultadosEventos);
            setEventos(eventosFormatados);
            setResultados(eventosFormatados.length);
        };
        carregarEventos();
    }, []);

    const formatarEventos = (resultadosEventos: any[]): Evento[] => {
        return resultadosEventos.map((evento) => ({
            id: evento.id,
            nome: evento.nome,
            tipo: evento.tipo || "N/A",
            localId: evento.localId,
            local: {
                id: evento.local.id, 
                nome: evento.local.nome || "Local não especificado",
                tipo: evento.local.tipo || "Tipo não especificado",
                portoes: evento.local.portoes || [], 
                endereco: evento.local.endereco || "Endereço não disponível", 
            },
            data: new Date(evento.data),
            usuarioId: evento.usuarioId,
            createdAt: new Date(evento.createdAt),
        }));
    };

    const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            const resultadosEventos = await buscarEventosPorNome(termo.trim());
            const eventosFormatados = formatarEventos(resultadosEventos);
            setEventos(eventosFormatados);
            setResultados(eventosFormatados.length);
            setExibirResultados(true);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTermo(value);

        if (value.trim() === "") {
            const carregarEventos = async () => {
                const resultadosEventos = await buscarEventosPorNome("");
                const eventosFormatados = formatarEventos(resultadosEventos);
                setEventos(eventosFormatados);
                setResultados(eventosFormatados.length);
                setExibirResultados(false);
            };
            carregarEventos();
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
                                <BreadcrumbLink href="/eventos" className="text-blue-500 hover:text-white">Eventos</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <h1 className="pt-8 text-white font-bold text-3xl">Eventos</h1>
                    <p className="pt-2 text-white">Confira a lista de todos os eventos cadastrados</p>

                    <div className="bg-[#10141d] rounded-3xl p-8 pt-0 mt-6 overflow-x-auto">
                        <TabelaEventos eventos={eventos} termo={termo} setTermo={setTermo} handleSearch={handleSearch} handleInputChange={handleInputChange} resultados={resultados} exibirResultados={exibirResultados} />
                    </div>
                </div>
            </main>
        </div>
    );
}

function TabelaEventos({ eventos, termo, setTermo, handleSearch, handleInputChange, resultados, exibirResultados }: { eventos: Evento[], termo: string, setTermo: React.Dispatch<React.SetStateAction<string>>, handleSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void, handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void, resultados: number | null, exibirResultados: boolean }) {
    return (
        <>
            <Table className="text-white border-separate border-spacing-0">
                <TableHeader className="w-full">
                    <TableRow className="hover:bg-transparent">
                        <TableHead colSpan={7} className="">
                            <div className="flex items-center mb-4 mt-4 flex-wrap">
                                <div className="relative flex items-center flex-grow mb-2 md:mb-0">
                                    <Search className="absolute left-3 text-[#6d99fb] w-4 h-4" />
                                    <Input
                                        type="text"
                                        placeholder="Pesquise por nome do evento"
                                        className="pl-8 py-2 rounded-lg border-none border-gray-300 bg-[#333b49] placeholder:text-[#647085] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        style={{ width: '300px', minWidth: '200px' }}
                                        value={termo}
                                        onChange={handleInputChange}
                                        onKeyDown={handleSearch}
                                    />
                                </div>
                                <Link href="/eventos/novo">
                                    <Button className="ml-4 px-4 py-2 bg-[#ebf0f9] text-black font-bold rounded-lg hover:bg-[#d2d6dd]">
                                        Adicionar Evento
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
                    <TableRow className="hover:bg-transparent w-full">
                        <TableHead className="text-[#cad6ec] w-2/7">Evento</TableHead>
                        <TableHead className="text-[#cad6ec] w-1/7">Tipo</TableHead>
                        <TableHead className="text-[#cad6ec] w-1/7">Local associado</TableHead>
                        <TableHead className="text-[#cad6ec] w-2/7">Endereço</TableHead>
                        <TableHead className="text-[#cad6ec] w-1/7">Portões cadastrados</TableHead>
                        <TableHead className="text-[#cad6ec] w-1/7">Data</TableHead>
                        <TableHead className="w-0 hidden">
                            <span className="sr-only">Ações</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {eventos.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-4">
                                Nenhum evento encontrado.
                            </TableCell>
                        </TableRow>
                    ) : (
                        eventos.map((evento, index) => (
                            <TableRow key={evento.id} className={index % 2 === 0 ? "bg-[#333b49]" : "bg-[#10141d]"}>
                                <TableCell className="py-4 px-6">{evento.nome}</TableCell>
                                <TableCell className="py-4 px-6"><span
                                    className={`px-2 py-1 border rounded font-bold text-white border-none ${
                                        evento.tipo === 'Show' ? 'bg-green-500' :
                                        evento.tipo === 'Música' ? 'bg-[#61461f]' :
                                        evento.tipo === 'Palestra' ? 'bg-red-500' :
                                        'bg-blue-500' 
                                    }`}
                                >
                                    {evento.tipo || "Tipo não especificado"} 
                                </span></TableCell>
                                <TableCell className="py-4 px-6">{evento.local?.nome || "Local não especificado"}</TableCell>
                                <TableCell className="py-4 px-6">{evento.local?.endereco || "Endereço não disponível"}</TableCell>
                                <TableCell className="py-4 px-6">{evento.local?.portoes.join(", ") || "Nenhum portão cadastrado"}</TableCell>
                                <TableCell className="py-4 px-6">{evento.data.toLocaleDateString()}</TableCell>
                                <TableCell className="py-4 px-6 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="text-blue-400 ml-auto">
                                            <MoreVertical />
                                            <span className="sr-only">Ações</span>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className='bg-[#333b49] border-none text-white'>
                                            <Link href={`/eventos/${evento.id}/editar`}>
                                                <DropdownMenuItem className="hover:bg-blue-200">Editar</DropdownMenuItem>
                                            </Link>
                                            <DeleteDropdownItemEvento id={evento.id.toString()} disabled={false} />
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
