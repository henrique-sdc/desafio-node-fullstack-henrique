"use server";
import { z } from "zod";
import db from "@/db/db";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";

const eventoSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    tipo: z.string().optional(),
    data: z.string(),
    horario: z.string().min(1, "Horário é obrigatório"),
    email: z.string().email("E-mail inválido").optional(),
    telefone: z.string().optional(),
});

const prisma = new PrismaClient();

export async function addEvento(formData: FormData, localId: number) {
    const result = eventoSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!result.success) {
        return { fieldErrors: result.error.flatten().fieldErrors };
    }

    const data = result.data;

    // Combina data e hora em um único objeto Date
    const [ano, mes, dia] = data.data.split('-');
    const [hora, minuto] = data.horario.split(':');
    const dataHoraCombinada = new Date(Number(ano), Number(mes) - 1, Number(dia), Number(hora), Number(minuto));

    try {
        await prisma.evento.create({
            data: {
                nome: data.nome,
                tipo: data.tipo,
                data: dataHoraCombinada, // Usa Date para data
                horario: data.horario, // Mantém como string
                localId: localId,
                usuarioId: 1, // Certifique-se de que este ID do usuário está correto
                email: data.email,
                telefone: data.telefone,
                portoes: [], // ou data.portoes se estiver usando
            },
        });

        // Se você estiver usando Next.js, pode ser que precise retornar ou redirecionar
        return { success: true }; // Retorna um sucesso após a inserção
    } catch (error) {
        console.error("Erro ao criar evento:", error);
        return { formError: "Erro ao criar evento. Por favor, tente novamente." };
    } finally {
        await prisma.$disconnect(); // Fecha a conexão com o banco
    }
}

export async function updateEvento(id: string, formData: FormData, localId: number) {
    const result = eventoSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!result.success) {
        return { fieldErrors: result.error.flatten().fieldErrors };
    }

    const data = result.data;
    const evento = await db.evento.findUnique({ where: { id: Number(id) } });

    if (!evento) {
        return notFound();
    }

    const dataEvento = new Date(data.data);
    const [hora, minuto] = data.horario.split(':');

    dataEvento.setHours(Number(hora));
    dataEvento.setMinutes(Number(minuto));

    await db.evento.update({
        where: { id: Number(id) },
        data: {
            nome: data.nome,
            tipo: data.tipo,
            data: dataEvento,
            horario: data.horario,
            localId: localId,
            email: data.email,
            telefone: data.telefone,
        },
    });

    revalidatePath("/");
    redirect("/eventos");
}

export async function deleteEvento(id: string) {
    const evento = await db.evento.delete({ where: { id: Number(id) } });
    if (!evento) {
        return notFound();
    }

    revalidatePath("/");
    redirect("/eventos");
}

export const buscarEventosPorNome = async (termo: string) => {
    return await prisma.evento.findMany({
        where: {
            nome: {
                contains: termo,
                mode: 'insensitive',
            },
        },
        include: {
            local: {
                select: {
                    id: true,
                    nome: true,
                    endereco: true,
                    portoes: true,
                    tipo: true,
                },
            },
        },
    });
};

export async function getLocais() {
    try {
        const locais = await prisma.local.findMany();
        return locais;
    } catch (error) {
        console.error("Erro ao buscar locais:", error);
        throw new Error("Erro ao buscar locais");
    } finally {
        await prisma.$disconnect();
    }
}
