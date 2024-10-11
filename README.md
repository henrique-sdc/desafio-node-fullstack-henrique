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
