"use client"
import { useTransition } from "react";
import { deleteLocal } from "@/app/locais/_actions/locais"; 
import { deleteEvento } from "@/app/eventos/_actions/eventos"; 
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"; 
import { useRouter } from "next/navigation";

export function ActiveToggleDropdownItem({
    id,
}: {
    id: string,
}) {

}

export function DeleteDropdownItem( {id, disabled}: { id: string, disabled: boolean }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter() 
    return (
        <DropdownMenuItem
            disabled={ disabled || isPending} 
            onClick={() => {
                startTransition(async () => {
                    await deleteLocal(id) 
                    router.refresh() 
                })
            }}>Deletar</DropdownMenuItem> 
    )
}

interface DeleteDropdownItemProps {
    id: string; // ID do evento a ser deletado
    disabled: boolean; // Desabilitar o botão se true
}

export function DeleteDropdownItemEvento({ id, disabled }: DeleteDropdownItemProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleDelete = async () => {
        // Confirmação antes da exclusão
        const confirmed = confirm("Você tem certeza que deseja excluir este evento?");
        if (confirmed) {
            startTransition(async () => {
                await deleteEvento(id); // Chama a função para deletar o evento
                router.refresh(); // Atualiza a página após a exclusão
            });
        }
    };

    return (
        <DropdownMenuItem
            disabled={disabled || isPending}
            onClick={handleDelete}
        >
            Deletar
        </DropdownMenuItem>
    );
}