import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"; // atualizado para src/components
import { LocalForm } from "@/components/LocalForm";
import { PageHeader } from "@/components/PageHeader";
import db from "@/db/db";

export default async function EditarLocalPage({
    params: { id },
}: {
    params: { id: string }
}) {
    const numericId = parseInt(id, 10);
    const local = await db.local.findUnique({ where: { id: numericId } });

    return (
        <>
            <div className="bg-[#191e28] bg-cover bg-center bg-no-repeat min-h-screen w-screen text-white">
                <div className="space-y-12 p-6 mx-auto mt-12 max-w-7xl">
                    <div className="px-4 md:px-8 lg:px-44 pt-12">
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
                        <div className="pt-6">
                            <PageHeader>Editar Local</PageHeader>
                        </div>
                    </div>
                    <div className="bg-[#10141d] rounded-3xl p-6 md:p-8 pt-0 mt-8 mb-8 mx-auto max-w-4xl w-full">
                        <div className="pt-12">
                            <LocalForm local={local} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
