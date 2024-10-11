"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { addEvento, getLocais, updateEvento } from "../app/eventos/_actions/eventos";
import { useRouter } from "next/navigation";
import { Evento } from "@prisma/client";
import Link from "next/link";

interface FormErrors {
    nome?: string;
    tipo?: string;
    data?: string;
    horario?: string;
    localId?: string;
    email?: string;
    telefone?: string;
}

export function EventoForm({ evento }: { evento?: Evento | null }) {
    const router = useRouter();
    const [errors, setErrors] = useState<FormErrors>({});
    const [localId, setLocalId] = useState<string>(evento?.localId?.toString() || "");
    const [locais, setLocais] = useState<any[]>([]);

    useEffect(() => {
        const fetchLocais = async () => {
            const locaisData = await getLocais();
            setLocais(locaisData);
        };
        fetchLocais();
    }, []);

    const action = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (!localId) {
            setErrors({ localId: "O local é obrigatório." });
            return;
        }

        try {
            if (evento) {
                await updateEvento(evento.id.toString(), formData, Number(localId));
            } else {
                await addEvento(formData, Number(localId));
            }
            router.push('/eventos');
        } catch (error: any) {
            if (error.fieldErrors) {
                setErrors(error.fieldErrors);
            }
        }
    };

    return (
        <form onSubmit={action} className="space-y-8 mx-auto max-w-2xl">
            <p className="text-lg font-ligth">Informações básicas</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="nome">Nome do evento*</Label>
                    <Input
                        type="text"
                        id="nome"
                        name="nome"
                        required
                        defaultValue={evento?.nome || ""}
                        placeholder="Informe o nome evento"
                        className={`pl-4 py-2 rounded-lg border-none border-gray-300 bg-[#333b49] placeholder:text-[#647085] text-white ${errors.nome ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.nome && <div className="text-destructive">{errors.nome}</div>}
                </div>
                <div className="flex flex-col">
                    <Label htmlFor="tipo" className="mt-1">Selecione um tipo*</Label>
                    <select
                        id="tipo"
                        name="tipo"
                        defaultValue={evento?.tipo || ""}
                        className={`mt-2 pl-4 py-2 rounded-lg border-none bg-[#333b49] placeholder:text-[#647085] text-white ${errors.tipo ? 'border-red-500' : 'border-gray-300'}`}
                        required
                    >
                        <option value="" disabled>Selecione um tipo</option>
                        <option value="Futebol">Futebol</option>
                        <option value="Show">Show</option>
                    </select>
                    {errors.tipo && <div className="text-destructive">{errors.tipo}</div>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="data">Data do evento*</Label>
                    <Input
                        type="date"
                        id="data"
                        name="data"
                        required
                        defaultValue={evento?.data ? evento.data.toISOString().split('T')[0] : ""}
                        className={`pl-4 py-2 rounded-lg border-none border-gray-300 bg-[#333b49] placeholder:text-[#647085] text-white ${errors.data ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.data && <div className="text-destructive">{errors.data}</div>}
                </div>
                <div>
                    <Label htmlFor="horario">Horário do evento*</Label>
                    <Input
                        type="time"
                        id="horario"
                        name="horario"
                        required
                        defaultValue={evento?.horario || ""}
                        className={`pl-4 py-2 rounded-lg border-none border-gray-300 bg-[#333b49] placeholder:text-[#647085] text-white ${errors.horario ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.horario && <div className="text-destructive">{errors.horario}</div>}
                </div>
            </div>

            <div className="grid grid-cols-1">
                <div>
                    <Label htmlFor="localId">Selecione um Local*</Label>
                </div>
                <select
                    id="localId"
                    name="localId"
                    value={localId}
                    onChange={(e) => setLocalId(e.target.value)}
                    className={`pl-4 overflow-y-auto py-2 max-w-80 rounded-lg border-none border-gray-300 bg-[#333b49] placeholder:text-[#647085] text-white ${errors.localId ? 'border-red-500' : 'border-gray-300'}`}
                    required
                >
                    <option value="" disabled>Selecione um local</option>
                    {locais.map((local) => (
                        <option key={local.id} value={local.id}>{local.nome}</option>
                    ))}
                </select>
                <Link href={"/locais/novo"}>
                    <p className="text-[#9ed0e6] text-right max-w-80">Cadastrar local</p>
                </Link>
                {errors.localId && <div className="text-destructive">{errors.localId}</div>}
            </div>

            <hr />

            <p className="text-lg font-ligth">Contato</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="email">E-mail*</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        required
                        defaultValue={evento?.email || ""}
                        placeholder="Informe um e-mail"
                        className={`pl-4 py-2 rounded-lg border-none border-gray-300 bg-[#333b49] placeholder:text-[#647085] text-white ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <div className="text-destructive">{errors.email}</div>}
                </div>
                <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        defaultValue={evento?.telefone || ""}
                        placeholder="Informe um telefone"
                        className={`pl-4 py-2 rounded-lg border-none border-gray-300 bg-[#333b49] placeholder:text-[#647085] text-white ${errors.telefone ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.telefone && <div className="text-destructive">{errors.telefone}</div>}
                </div>
            </div>

            <hr />

            <div className="flex justify-end space-x-4">
                <Button type="button" className="bg-inherit border-2 hover:bg-red-900" onClick={() => router.push('/eventos')}>Cancelar</Button>
                <Button type="submit" className="bg-[#ebf0f9] text-[#3f4654] hover:bg-white">
                    {evento ? "Salvar" : "Cadastrar"}
                </Button>
            </div>
        </form>
    );
}