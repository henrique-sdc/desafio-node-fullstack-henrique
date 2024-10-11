"use server";
import { z } from "zod";
import db from "@/db/db";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const localSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"), 
    apelido: z.string().optional(), 
    tipo: z.string().min(1, "Tipo é obrigatório"),
    cnpj: z.string().optional(), 
    cidade: z.string().min(1, "Cidade é obrigatória"),
    estado: z.string().min(1, "Estado é obrigatório"),
    cep: z.string().min(1, "CEP é obrigatório"),
    endereco: z.string().min(1, "Endereço é obrigatório"), 
    complemento: z.string().optional(), 
    email: z.string().email("E-mail inválido").optional(), 
    telefone: z.string().optional(), 
    portoes: z.array(z.string()).optional() 
});

export async function addLocal(prevState: unknown, formData: FormData) {
    const result = localSchema.safeParse(Object.fromEntries(formData.entries()));
    if (result.success === false) {
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    await db.local.create({ 
        data: {
            nome: data.nome,
            apelido: data.apelido,
            tipo: data.tipo,
            cnpj: data.cnpj,
            cidade: data.cidade,
            estado: data.estado,
            cep: data.cep,
            endereco: data.endereco,
            complemento: data.complemento,
            email: data.email,
            telefone: data.telefone,
            portoes: data.portoes || [],
        },
    });

    revalidatePath("/");
    redirect("/locais");
}

export async function updateLocal(id: string, prevState: unknown, formData: FormData) {
    const result = localSchema.safeParse(Object.fromEntries(formData.entries()));

    if (result.success === false) { 
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data; 
    const local = await db.local.findUnique({ where: { id: Number(id) } });

    if (local == null) return notFound(); 

    await db.local.update({ 
        where: { id: Number(id) }, 
        data: {
            nome: data.nome,
            apelido: data.apelido,
            tipo: data.tipo,
            cnpj: data.cnpj,
            cidade: data.cidade,
            estado: data.estado,
            cep: data.cep,
            endereco: data.endereco,
            complemento: data.complemento,
            email: data.email,
            telefone: data.telefone,
            portoes: data.portoes || [],
        },
    });

    revalidatePath("/"); 
    redirect("/locais");
}

export async function deleteLocal(id: string) {
    const local = await db.local.delete({ where: { id: Number(id) } });
    if (local == null) return notFound(); 

    revalidatePath("/"); 
    redirect("/locais");
}

export async function buscarLocaisPorNome(termo: string) {
    const locais = await db.local.findMany({
        where: {
            nome: {
                contains: termo, 
            }
        },
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

    return locais;
}