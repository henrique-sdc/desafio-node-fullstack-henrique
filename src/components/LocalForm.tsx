"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { addLocal, updateLocal } from "../app/locais/_actions/locais";
import { useFormState } from "react-dom";
import { Local } from "@prisma/client";
import { Plus } from "lucide-react";

export function LocalForm({ local }: { local?: Local | null }) {
    const [error, action] = useFormState(local == null ? addLocal : updateLocal.bind(null, local.id.toString()), {});
    const [portoes, setPortoes] = useState<string[]>(local?.portoes || []);

    return (
        <form action={action} className="space-y-8 mx-auto max-w-2xl">
            <p className="text-lg font-semibold">Informações básicas</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="nome">Nome do local*</Label>
                    <Input
                        type="text"
                        id="nome"
                        name="nome"
                        required
                        placeholder="Informe o nome do Local"
                        defaultValue={local?.nome || ""}
                        className={`pl-4 py-2 rounded-lg border-none border-gray-300 bg-[#333b49] placeholder:text-[#647085] text-white ${error.nome ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {error.nome && <div className="text-destructive">{error.nome}</div>}
                </div>
                <div>
                    <Label htmlFor="apelido">Apelido</Label>
                    <Input
                        type="text"
                        id="apelido"
                        name="apelido"
                        placeholder="Informe um apelido (caso exista)"
                        defaultValue={local?.apelido || ""}
                        className={`pl-4 py-2 rounded-lg border-none border-gray-300 bg-[#333b49] placeholder:text-[#647085] text-white ${error.apelido ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {error.apelido && <div className="text-destructive">{error.apelido}</div>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <Label htmlFor="tipo" className="mt-1">Selecione um tipo*</Label>
                    <select
                        id="tipo"
                        name="tipo"
                        className={`mt-2 pl-4 py-2 rounded-lg border-none bg-[#333b49] placeholder:text-[#647085] text-white ${error.tipo ? 'border-red-500' : 'border-gray-300'}`}
                        defaultValue={local?.tipo || ""}
                    >
                        <option value="" disabled>Selecione um tipo</option>
                        <option value="Futebol">Futebol</option>
                        <option value="Show">Show</option>
                    </select>
                    {error.tipo && <div className="text-destructive">{error.tipo}</div>}
                </div>
                <div>
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                        type="text"
                        id="cnpj"
                        name="cnpj"
                        placeholder="Informe um CNPJ (caso exista)"
                        defaultValue={local?.cnpj || ""}
                        className={`pl-4 py-2 rounded-lg border-none border-gray-300 bg-[#333b49] placeholder:text-[#647085] text-white ${error.cnpj ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {error.cnpj && <div className="text-destructive">{error.cnpj}</div>}
                </div>
            </div>

            <hr />

            <p className="text-lg font-semibold">Localização</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="cidade">Cidade*</Label>
                    <Input
                        type="text"
                        id="cidade"
                        name="cidade"
                        placeholder="Informe a Cidade"
                        defaultValue={local?.cidade || ""}
                        required
                        className={`pl-4 py-2 rounded-lg border-none border-gray-300 bg-[#333b49] placeholder:text-[#647085] text-white ${error.cidade ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {error.cidade && <div className="text-destructive">{error.cidade}</div>}
                </div>
                <div>
                    <Label htmlFor="estado">Estado*</Label>
                    <Input
                        type="text"
                        id="estado"
                        name="estado"
                        placeholder="Informe o Estado"
                        defaultValue={local?.estado || ""}
                        required
                        className={`pl-4 py-2 rounded-lg border-none border-gray-300 bg-[#333b49] placeholder:text-[#647085] text-white ${error.estado ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {error.estado && <div className="text-destructive">{error.estado}</div>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="cep">CEP*</Label>
                    <Input
                        type="text"
                        id="cep"
                        name="cep"
                        placeholder="Informe o CEP"
                        defaultValue={local?.cep || ""}
                        className={`pl-4 py-2 rounded-lg border-none border-gray-300 bg-[#333b49] placeholder:text-[#647085] text-white ${error.cep ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {error.cep && <div className="text-destructive">{error.cep}</div>}
                </div>
                <div>
                    <Label htmlFor="endereco">Endereço*</Label>
                    <Input
                        type="text"
                        id="endereco"
                        name="endereco"
                        placeholder="Informe o Endereço"
                        defaultValue={local?.endereco || ""}
                        required
                        className={`pl-4 py-2 rounded-lg border-none border-gray-300 bg-[#333b49] placeholder:text-[#647085] text-white ${error.endereco ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {error.endereco && <div className="text-destructive">{error.endereco}</div>}
                </div>
            </div>

            <div className="grid grid-cols-1">
                <div>
                    <Label htmlFor="complemento">Complemento</Label>
                    <Input
                        type="text"
                        id="complemento"
                        name="complemento"
                        placeholder="Informe o complemento"
                        defaultValue={local?.complemento || ""}
                        className={`max-w-[327px] pl-4 py-2 rounded-lg border-none border-gray-300 bg-[#333b49] placeholder:text-[#647085] text-white ${error.complemento ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {error.complemento && <div className="text-destructive">{error.complemento}</div>}
                </div>
            </div>

            <hr />

            <p className="text-lg font-semibold">Contato</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="email">E-mail*</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Informe um e-mail"
                        defaultValue={local?.email || ""}
                        className={`pl-4 py-2 rounded-lg border-none border-gray-300 bg-[#333b49] placeholder:text-[#647085] text-white ${error.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {error.email && <div className="text-destructive">{error.email}</div>}
                </div>
                <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        placeholder="Informe um telefone"
                        defaultValue={local?.telefone || ""}
                        className={`pl-4 py-2 rounded-lg border-none border-gray-300 bg-[#333b49] placeholder:text-[#647085] text-white ${error.telefone ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {error.telefone && <div className="text-destructive">{error.telefone}</div>}
                </div>
            </div>

            <hr />

            <p className="text-lg font-semibold">Cadastro de entradas e catracas</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <Label>Insira as Entradas</Label>
                    <div className="flex items-center space-x-1 mt-2">
                        <Input 
                            //id="portoes"
                            //name="portoes"
                            //type="text"
                            defaultValue={local?.portoes || ""}
                            placeholder="Insira as entradas"
                            className="pl-4 py-2 rounded-lg border-none border-gray-300 bg-[#333b49] text-[#647085] flex-grow"
                        />
                        <Button
                            type="button"
                            onClick={() => setPortoes([...portoes, ""])}
                            className="flex items-center justify-center bg-[#051d41] rounded-md text-white p-2"
                        >
                            <Plus />
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <Label>Insira as Catracas</Label>
                    <div className="flex items-center space-x-1 mt-2">
                        <Input
                            //id="portoes"
                            //name="portoes"
                            //defaultValue={local?.portoes || ""}
                            type="text"
                            placeholder="Insira as catracas"
                            className="pl-4 py-2 rounded-lg border-none border-gray-300 bg-[#333b49] text-[#647085] flex-grow"
                        />
                        <Button
                            type="button"
                            className="flex items-center justify-center bg-[#051d41] rounded-md text-white p-2"
                        >
                            <Plus />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex justify-end space-x-4">
                <Button type="button" className="bg-inherit border-2 hover:bg-red-900">Cancelar</Button>
                <Button type="submit" className="bg-[#ebf0f9] text-[#3f4654] hover:bg-white">Cadastrar</Button>
            </div>
        </form>
    );
}