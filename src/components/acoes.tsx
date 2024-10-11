"use client"
import { useState, useTransition } from "react";
import { deleteLocal } from "@/app/locais/_actions/locais";
import { deleteEvento } from "@/app/eventos/_actions/eventos";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { 
    AlertDialog, 
    AlertDialogTrigger, 
    AlertDialogContent, 
    AlertDialogHeader, 
    AlertDialogFooter, 
    AlertDialogTitle, 
    AlertDialogDescription, 
    AlertDialogCancel, 
    AlertDialogAction 
} from "@/components/ui/alert-dialog"

export function ActiveToggleDropdownItem({
    id,
}: {
    id: string,
}) {

}

export function DeleteDropdownItem({ id, disabled }: { id: string; disabled: boolean }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        startTransition(async () => {
            await deleteLocal(id);
            router.refresh();
        });
    };

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(true); 
    };

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <DropdownMenuItem disabled={disabled || isPending} onClick={handleClick}>
                        Deletar
                    </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#333b49] text-white border border-gray-600 rounded-lg shadow-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg font-bold text-white">
                            Apagar local
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-[#cad6ec]">
                            Você tem certeza que deseja apagar este local? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex justify-end gap-4">
                        <AlertDialogCancel
                            className="bg-transperant hover:bg-gray-600 text-white px-4 py-2 rounded-md">
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => { handleDelete(); setOpen(false); }}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
                            Confirmar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

interface DeleteDropdownItemProps {
    id: string;
    disabled: boolean;
}

export function DeleteDropdownItemEvento({ id, disabled }: DeleteDropdownItemProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const [open, setOpen] = useState(false);


    const handleDelete = async () => {
        startTransition(async () => {
            await deleteEvento(id);
            router.refresh();
        });
    };

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(true);
    };

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <DropdownMenuItem disabled={disabled || isPending} onClick={handleClick}>
                        Deletar
                    </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#333b49] text-white border border-gray-600 rounded-lg shadow-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg font-bold text-white">
                            Apagar evento
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-[#cad6ec]">
                            Você tem certeza que deseja apagar este evento? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex justify-end gap-4">
                        <AlertDialogCancel onClick={() => setOpen(false)} className="bg-transperant hover:bg-gray-600 text-white px-4 py-2 rounded-md">
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => { handleDelete(); setOpen(false); }}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
                            Confirmar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}