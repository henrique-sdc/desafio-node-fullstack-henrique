"use client"
import { useTransition } from "react";
import { deleteLocal } from "@/app/locais/_actions/locais"; // atualizado para app/_actions
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"; // atualizado para src/components
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