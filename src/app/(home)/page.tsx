import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { House, Ticket, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import db from '@/db/db';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

export async function getLocais() {
    const locais = await db.local.findMany({
        take: 3,
        select: {
            nome: true,
            endereco: true,
            portoes: true,
        }
    });
    return locais;
}

export async function getEventos() {
    const eventos = await db.evento.findMany({
        take: 3,
        select: {
            nome: true,
            tipo: true,
            local: {
                select: {
                    nome: true
                }
            },
        }
    });
    return eventos;
}

export async function getUsuario() {
    const usuario = await db.usuario.findMany({
        take: 1,
        select: {
            nome: true,
        },
    });

    return usuario[0];
}

export default async function Home() {
    const locais = await getLocais();
    const eventos = await getEventos();
    const usuarios = await getUsuario();

    return (
        <div className="bghome">
            <main className="space-y-12">
                <div className="flex flex-col md:flex-row md:ml-24 mt-36 items-center">
                    <Image
                        src="/images/corpo.svg"
                        alt="Logo da Empresa"
                        width={50}
                        height={50}
                        className="w-auto h-auto"
                    />
                    <div className="ml-1">
                        <h1 className="text-white text-3xl font-medium">Olá, {usuarios.nome}</h1>
                        <p className="text-white text-sm mt-2">Confira todos os seus eventos e locais em um só lugar!</p>
                    </div>
                </div>

                <div className='mx-4 md:mx-28'>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        <div className="flex-1">
                            <Alert className="flex items-center justify-between bg-[#2f3b28] border-0 text-white p-6">
                                <div className="flex items-start">
                                    <House className="h-6 w-6 mr-2" />
                                    <div>
                                        <AlertTitle className="text-2xl font-bold">Locais</AlertTitle>
                                        <AlertDescription className="text-sm">
                                            Confira todos os locais cadastrados!
                                        </AlertDescription>
                                    </div>
                                </div>
                                <Link href="/locais" passHref>
                                    <Button className="ml-4 text-black font-bold bg-[#cad6ec] hover:bg-slate-50">
                                        Conferir locais
                                    </Button>
                                </Link>
                            </Alert>
                        </div>

                        <div className="flex-1">
                            <Alert className="flex items-center justify-between bg-[#461527] border-0 text-white p-6">
                                <div className="flex items-start">
                                    <Ticket className="h-6 w-6 mr-2" />
                                    <div>
                                        <AlertTitle className="text-2xl font-bold">Eventos</AlertTitle>
                                        <AlertDescription className="text-sm">
                                            Confira todos os eventos cadastrados!
                                        </AlertDescription>
                                    </div>
                                </div>
                                <Link href="/eventos" passHref>
                                    <Button className="ml-4 text-black font-bold bg-[#cad6ec] hover:bg-slate-50">
                                        Conferir eventos
                                    </Button>
                                </Link>
                            </Alert>
                        </div>
                    </div>
                </div>

                <div className='mx-4 md:mx-28'>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        <div className="flex-1 bg-[#10141d] p-8 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl text-white">Últimos Locais Adicionados</h2>
                                <Link href="/locais" className="text-blue-400 underline">Ver todos</Link>
                            </div>
                            <Table className="text-white table-fixed border-separate border-spacing-0">
                                <TableBody>
                                    {locais.length > 0 ? (
                                        locais.map((local, index) => (
                                            <TableRow key={local.nome} className={index % 2 === 0 ? 'bg-[#333b49]' : 'bg-[#10141d]'}>
                                                <TableCell className="py-4 px-2 md:px-6">{local.nome}</TableCell>
                                                <TableCell className="py-4 px-2 md:px-6">{local.endereco}</TableCell>
                                                <TableCell className="py-4 px-2 md:px-6">{local.portoes.join(", ")}</TableCell>
                                                <TableCell className="py-4 px-2 md:px-6 text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger className='text-blue-400 ml-auto'>
                                                            <MoreVertical />
                                                            <span className="sr-only">Ações</span>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent className='bg-[#333b49] border-none text-white'>
                                                            <DropdownMenuItem asChild>
                                                                <Link href={`/locais`}>
                                                                    Ver
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem asChild>
                                                                <Link href={`/locais`}>
                                                                    Editar
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center">Nenhum local encontrado</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex-1 bg-[#10141d] p-8 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl text-white">Últimos Eventos Adicionados</h2>
                                <Link href="/eventos" className="text-blue-400 underline">Ver todos</Link>
                            </div>
                            <Table className="text-white table-fixed border-separate border-spacing-0">
                                <TableBody>
                                    {eventos.length > 0 ? (
                                        eventos.map((evento, index) => (
                                            <TableRow key={evento.nome} className={index % 2 === 0 ? 'bg-[#333b49]' : 'bg-[#10141d]'}>
                                                <TableCell className="py-4 px-2 md:px-6">{evento.nome}</TableCell>
                                                <TableCell>
                                                    <span
                                                        className={`px-2 py-1 border rounded font-bold text-white border-none ${evento.tipo === 'Show' ? 'bg-green-500' :
                                                            evento.tipo === 'Workshop' ? 'bg-yellow-500' :
                                                                evento.tipo === 'Conferência' ? 'bg-red-500' :
                                                                    'bg-blue-500'
                                                            }`}
                                                    >
                                                        {evento.tipo}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="py-4 px-2 md:px-6">{evento.local.nome}</TableCell>
                                                <TableCell className="py-4 px-2 md:px-6 text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger className='text-blue-400 ml-auto'>
                                                            <MoreVertical />
                                                            <span className="sr-only">Ações</span>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent className='bg-[#333b49] border-none text-white'>
                                                            <DropdownMenuItem asChild>
                                                                <Link href={`/locais`}>
                                                                    Ver
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem asChild>
                                                                <Link href={`/locais`}>
                                                                    Editar
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center">Nenhum evento encontrado</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
