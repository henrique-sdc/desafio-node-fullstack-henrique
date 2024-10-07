import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { LocalForm } from "../../_components/LocalForm";
import { PageHeader } from "../../_components/Pageheader";

export default function NovoLocal() {
    return (
        <>
            <div className="bg-[#191e28] bg-cover bg-center bg-no-repeat min-h-screen w-screen text-white">
                <div className="space-y-12 p-6 mx-auto mt-12 max-w-7xl">
                    <div className="px-4 md:px-44 pt-12">
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
                            <PageHeader>Adicionar novo local</PageHeader>
                            <p className="text-sm md:text-base">*Campos obrigatórios</p>
                        </div>
                    </div>
                    <div className="bg-[#10141d] rounded-3xl p-8 pt-0 mt-8 mb-8 mx-auto max-w-4xl w-full">
                        <div className="pt-12">
                            <LocalForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
