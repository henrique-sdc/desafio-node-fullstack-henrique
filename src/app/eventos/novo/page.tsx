import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { EventoForm } from "@/components/EventoForm";
import { PageHeader } from "../../../components/PageHeader";

export default function NovoEvento() {
    return (
        <div className="bg-[#191e28] bg-cover bg-center bg-no-repeat min-h-screen w-screen text-white">
            <div className="flex flex-col items-start justify-center p-6 mx-auto mt-12 max-w-7xl space-y-12">
                <div className="px-4 sm:px-10 md:px-44 pt-24">
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
                    <div className="pt-6">
                        <PageHeader>Adicionar novo Evento</PageHeader>
                        <p className="text-sm md:text-base mb-4 text-left">*Campos obrigatórios</p>
                    </div>
                </div>
                <div className="bg-[#10141d] rounded-3xl p-8 pt-6 mt-8 mb-8 mx-auto max-w-4xl w-full">
                    <EventoForm />
                </div>
            </div>
        </div>
    );
}