# OrgEventos - Gerenciador de Eventos e Locais

OrgEventos é um aplicativo web full-stack construído com Next.js, Prisma, PostgreSQL e Tailwind CSS (usando o Shadcn UI). Ele permite gerenciar eventos e locais, incluindo funcionalidades de criação, leitura, atualização e exclusão (CRUD).

## Tecnologias Utilizadas

* **Next.js:** Framework React para desenvolvimento web.
* **Prisma:** ORM (Object-Relational Mapper) para interação com o banco de dados.
* **PostgreSQL:** Banco de dados relacional.
* **Tailwind CSS:** Framework CSS para estilização.
* **Shadcn UI:** Biblioteca de componentes React para Tailwind CSS.
* **Zod:**  Validação de esquema para dados.
* **Docker:**  Para conteinerização e desenvolvimento local.


## Instalação e Execução

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/henrique-sdc/desafio-node-fullstack-henrique.git
   ```

2. **Instale as dependências:**

   ```bash
   npm i
   ```

3. **Configure o banco de dados:**

   * Certifique-se de ter o Docker instalado e em execução.
   * Crie as tabelas do banco de dados usando o Prisma Migrate:

*  Você deve subir o banco de dados com docker usando o comando:
     ```bash
     docker-compose up --build
     ```
     ```bash
     npx prisma migrate dev
     ```

4. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

O aplicativo estará disponível em `http://localhost:3000`.

## Funcionalidades

* **Home:** Visão geral dos últimos eventos e locais adicionados.
* **Eventos:** Listagem, pesquisa, criação, edição e exclusão de eventos.
* **Locais:** Listagem, pesquisa, criação, edição e exclusão de locais.


## Estrutura do Projeto

* **`app`:**  Contém as rotas e a lógica do lado do servidor.
* **`components`:** Componentes React reutilizáveis.
* **`db`:**  Configuração do Prisma.
* **`public`:** Arquivos estáticos, como imagens.
* **`prisma`:**  Esquema do Prisma e migrações.


## Considerações

* Este projeto utiliza o Shadcn UI para componentes estilizados com Tailwind CSS.
* A validação de dados é feita com o Zod.
* O banco de dados PostgreSQL é gerenciado com Docker.

## Dados de Teste (Opcional)

Caso queira popular o banco de dados com dados de teste, execute os seguintes comandos SQL no seu cliente PostgreSQL:

**Usuário:**

```sql
INSERT INTO "Usuario" (nome, email, senha, telefone, role, "createdAt", "updatedAt")
VALUES ('Mariana Silva', 'mariana.silva@email.com', 'senhaSegura123', '123456789', 'admin', NOW(), NOW());
```

**Locais:**

```sql
INSERT INTO "Local" (nome, apelido, tipo, cnpj, cidade, estado, cep, endereco, complemento, email, telefone, portoes, "createdAt", "updatedAt") VALUES ('Centro Cultural', 'CC', 'Cultural', '12.345.678/0001-99', 'São Paulo', 'SP', '01000-000', 'Avenida Paulista, 1578', 'Próximo ao Parque Trianon', 'contato@centrocultural.com', '(11) 98765-4321', ARRAY['Portão 1', 'Portão 2'], NOW(), NOW());
INSERT INTO "Local" (nome, apelido, tipo, cnpj, cidade, estado, cep, endereco, complemento, email, telefone, portoes, "createdAt", "updatedAt") VALUES ('Teatro Municipal', 'TM', 'Teatro', '98.765.432/0001-21', 'Rio de Janeiro', 'RJ', '20000-000', 'Praça Floriano, s/n', 'Centro', 'contato@teatromunicipalrj.com', '(21) 99876-5432', ARRAY['Portão A', 'Portão B'], NOW(), NOW());
INSERT INTO "Local" (nome, apelido, tipo, cnpj, cidade, estado, cep, endereco, complemento, email, telefone, portoes, "createdAt", "updatedAt") VALUES ('Estádio Nacional', 'EN', 'Esportivo', '12.987.654/0001-00', 'Brasília', 'DF', '70070-000', 'Eixo Monumental', 'Próximo ao Congresso Nacional', 'contato@estadionacionaldf.com', '(61) 99987-6543', ARRAY['Portão 1', 'Portão 2', 'Portão 3'], NOW(), NOW());
INSERT INTO "Local" (nome, apelido, tipo, cnpj, cidade, estado, cep, endereco, complemento, email, telefone, portoes, "createdAt", "updatedAt") VALUES ('Auditório Ibirapuera', 'AI', 'Auditório', '11.223.344/0001-55', 'São Paulo', 'SP', '04000-000', 'Parque Ibirapuera', 'Perto do lago', 'info@auditorioibirapuera.com', '(11) 91234-5678', ARRAY['Entrada Principal', 'Entrada Lateral'], NOW(), NOW());
INSERT INTO "Local" (nome, apelido, tipo, cnpj, cidade, estado, cep, endereco, complemento, email, telefone, portoes, "createdAt", "updatedAt") VALUES ('Centro de Convenções', 'CCON', 'Convenções', '22.333.444/0001-66', 'Salvador', 'BA', '40100-000', 'Avenida Sete de Setembro, 5000', 'Barra', 'contato@centrodeconvencoes.com', '(71) 98765-4321', ARRAY['Portão Norte', 'Portão Sul'], NOW(), NOW());
```

**Eventos:**

```sql
INSERT INTO "Evento" ("nome", "tipo", "data", "horario", ""localId", "usuarioId", "portoes", "email", "telefone", "createdAt")
VALUES ('Show de Rock', 'Música', '2024-11-15', '18:00', 1, 1, '{"Portão A", "Portão B"}', 'rockshow@email.com', '123456789', NOW());
INSERT INTO "Evento" ("nome", "tipo", "data", "horario", "localId", "usuarioId", "portoes", "email", "telefone", "createdAt")
VALUES ('Feira de Tecnologia', 'Tecnologia', '2024-12-01', '10:00', 2, 2, '{"Portão Principal"}', 'feiratech@email.com', '987654321', NOW());
INSERT INTO "Evento" ("nome", "tipo", "data", "horario", "localId", "usuarioId", "portoes", "email", "telefone", "createdAt")
VALUES ('Concerto Sinfônico', 'Música', '2024-10-20', '20:00', 3, 3, '{"Portão C", "Portão D"}', 'concerto@email.com', '564738291', NOW());
INSERT INTO "Evento" ("nome", "tipo", "data", "horario", "localId", "usuarioId", "portoes", "email", "telefone", "createdAt")
VALUES ('Palestra de Inovação', 'Palestra', '2024-11-05', '14:00', 4, 4, '{"Portão 1"}', 'palestrainovacao@email.com', '192837465', NOW());
INSERT INTO "Evento" ("nome", "tipo", "data", "horario", "localId", "usuarioId", "portoes", "email", "telefone", "createdAt")
VALUES ('Festival de Cinema', 'Cinema', '2024-12-10', '16:00', 5, 5, '{"Portão E"}', 'festivalcinema@email.com', '102938475', NOW());
```
